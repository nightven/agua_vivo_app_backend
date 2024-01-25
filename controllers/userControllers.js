const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { httpError, ctrlWrapper } = require("../helpers");
const {
  findUserByEmail,
  userCollection,
  updateUserById,
} = require("../db/services/userServices");

const { SECRET_KEY } = process.env;

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
    user: { email, avatar },
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

  res.json({ token, user: { email, avatar: user.avatar } });
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

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
};
