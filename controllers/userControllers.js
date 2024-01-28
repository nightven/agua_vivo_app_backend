const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const axios = require("axios");
const queryString = require("querystring");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT, FRONT_END, SECRET_KEY } =
  process.env;

const { httpError, ctrlWrapper, amountNormaLitres } = require("../helpers");
const {
  findUserByEmail,
  userCollection,
  updateUserById,
  newAvatar,
  findUserById,
  updateUserInfo,
} = require("../db/services/userServices");

const register = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail({ email });

  if (user) {
    throw httpError(409, "Email in use");
  }

  const avatar = gravatar.url(email);

  const newUser = userCollection({ ...req.body, avatar });
  await newUser.hashPassword();

  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  await updateUserById(newUser._id, { token });

  res.status(201).json({
    token,
    user: { email, avatar, gender: newUser.gender },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail({ email });

  if (!user) {
    throw httpError(401, "Email or password is wrong");
  }

  const comparePasswords = await user.comparePassword(password);
  if (!comparePasswords) {
    throw httpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  await updateUserById(user._id, { token });

  res.json({
    token,
    user: {
      email,
      avatar: user.avatar,
      gender: user.gender,
      dailyNorma: user.dailyNorma,
    },
  });
};

const current = (req, res) => {
  const { email, avatar } = req.user;
  res.json({ email, avatar });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  updateUserById(_id, { token: "" });

  res.sendStatus(204);
};

const pathAvatar = path.join(__dirname, "../public/avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) {
    throw httpError(404, "no file attached");
  }

  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}${originalname}`;

  const resultName = path.join(pathAvatar, fileName);
  await fs.rename(tempUpload, resultName);

  const avatar = path.join("avatars", fileName);

  await newAvatar(_id, { avatar });

  res.json({ avatar });
};

const getInfo = async (req, res) => {
  const { id } = req.params;
  const user = await findUserById(id);

  if (!user) {
    throw httpError(404);
  }

  res.json({
    user: {
      email: user.email,
      gender: user.gender,
      avatar: user.avatar,
      dailyNorma: user.dailyNorma,
    },
  });
};

const updateInfo = async (req, res) => {
  const { id } = req.params;
  const user = await updateUserInfo(id, req.body, { new: true });

  if (!user) {
    throw httpError(404);
  }

  res.json({
    user: { email: user.email, gender: user.gender, avatar: user.avatar },
  });
};

const dailyNorm = async (req, res) => {
  const { _id } = req.user;
  const { gender, weight, sportTime } = req.body;

  const user = await findUserById(_id);
  const waterNorm = amountNormaLitres(gender, weight, sportTime);

  if (!user) {
    throw httpError(404);
  }

  if (waterNorm > 15) {
    throw httpError(400, "The daily rate can be a maximum of 15000 ml");
  }

  user.gender = gender;
  user.dailyNorma = waterNorm;
  await user.save();

  res.json({ waterNorm });
};

const googleAuth = async (req, res) => {
  const paramsStr = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `http://localhost:8000/users/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${paramsStr}`
  );
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `http://localhost:${PORT}/users/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  let user = await findUserByEmail({ email: userData.data.email });
  if (!user) {
    throw httpError(
      "You should register from front-end first (not postman). Google/Facebook are only for sign-in"
    );
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  await updateUserById(user._id, { token });

  return res.redirect(
    `http://localhost:5173/agua_vivo_app/google-redirect?accessToken=${token}`
  );
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  getInfo: ctrlWrapper(getInfo),
  updateInfo: ctrlWrapper(updateInfo),
  dailyNorm: ctrlWrapper(dailyNorm),
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
};
