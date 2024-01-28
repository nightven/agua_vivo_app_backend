const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const axios = require("axios");
const queryString = require("querystring");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  PORT,
  FRONT_END,
  SECRET_KEY,
  BACK_END,
} = process.env;

const { httpError, ctrlWrapper } = require("../helpers");
const {
  findUserByEmail,
  userCollection,
  updateUserById,
  findUserById,
  updateUserInfo,
  createGoogleUser,
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
      name: user.name,
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

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = req.file.path;
  const user = await findUserById(_id);
  console.log(user);

  if (!user) {
    throw httpError(404);
  }

  user.avatar = avatarURL;
  user.save();

  res.json({ avatarURL });
};

const getInfo = async (req, res) => {
  const { id } = req.params;
  const user = await findUserById(id);

  if (!user) {
    throw httpError(404);
  }

  res.json({
    user: {
      name: user.email,
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
  const { dailyNorma } = req.body;

  if (dailyNorma > 15) {
    throw httpError(400, "The daily rate can be a maximum of 15 l");
  }

  const user = await updateUserInfo(_id, req.body, { new: true });

  if (!user) {
    throw httpError(404);
  }

  res.json({ dailyNorma });
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
      redirect_uri: `http://localhost:8000/users/google-redirect`,
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

  const name = userData.data.given_name;
  const email = userData.data.email;

  let user = await findUserByEmail({ email });

  if (!user) {
    user = await createGoogleUser({ email, name });
  }

  res.redirect(
    `https://localhost:5173/agua_vivo_app/google-redirect?email=${email}`
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
