const {
  findUserByEmail,
  userCollection,
  updateUserById,
  findUserByIdAndUpdate,
} = require("../db/services/authService");
const { httpError, sendEmail, ctrlWrapper } = require("../helpers");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const { createWater } = require("../db/services/waterServices");
const { findUserById } = require("../db/services/userServices");
const { messages } = require("../email/messages");

const { SECRET_KEY, FRONT_END } = process.env;

const register = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail({ email });

  if (user) {
    throw httpError(409, "Email in use");
  }

  const avatar = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = userCollection({ ...req.body, avatar, verificationToken });

  await sendEmail(messages.registerMessage(email, newUser));

  await newUser.hashPassword();
  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });

  await updateUserById(newUser._id, { token });

  const nweWater = await createWater({
    owner: newUser._id,
    dailyNorma: newUser.dailyNorma,
  });
  if (!nweWater) {
    throw httpError(400);
  }

  res.status(201).json({
    token,
    user: {
      email,
      avatar,
      gender: newUser.gender,
      dailyNorma: newUser.dailyNorma,
      verificationToken,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail({ email });

  if (!user) {
    throw httpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw httpError(401, "Email not verified");
  }

  const comparePasswords = await user.comparePassword(password);
  if (!comparePasswords) {
    throw httpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });

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
  const { name, email, avatar, gender, dailyNorma } = req.user;
  res.json({ name, email, avatar, gender, dailyNorma });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  updateUserById(_id, { token: "" });

  res.sendStatus(204);
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await findUserByEmail({ verificationToken });
  if (!user) throw httpError(404);

  await findUserByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.redirect(`${FRONT_END}/signin`);
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail({ email });
  if (!user) {
    throw httpError(404, "Email not found");
  }
  if (user.verify) {
    throw httpError(400, "Verification has already been passed");
  }

  await sendEmail(messages.registerMessage(email, user));

  res.json({
    message: "Verification email sent",
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await findUserByEmail({ email });

  if (!user) {
    throw httpError(404);
  }
  console.log(user._id);

  await sendEmail(messages.resetMessage(email, user));
  res.json({ message: "Email sent successfully" });
};

const resetPassword = async (req, res) => {
  const { password, id } = req.body;

  const user = await findUserById(id);
  if (!user) {
    throw httpError(404);
  }

  user.password = password;
  await user.hashPassword();
  await user.save();

  res.json({ message: "Password changed" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  forgotPassword: ctrlWrapper(forgotPassword),
  resetPassword: ctrlWrapper(resetPassword),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
