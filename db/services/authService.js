const User = require("../models/userModel");

const findUserByEmail = async (email) => {
  const user = await User.findOne(email);
  return user;
};

const updateUserById = async (id, token) => {
  const user = await User.findByIdAndUpdate(id, token);
  return user;
};

const userCollection = (body, avatar, token) => {
  const user = new User(body, avatar, token);
  return user;
};

const findUserByIdAndUpdate = async (id, { verify, verificationToken }) => {
  const user = await User.findByIdAndUpdate(id, { verify, verificationToken });
  return user;
};

const findVerificationToken = async ({ verificationToken }) => {
  const user = await User.findOne({ verificationToken });
  return user;
};

module.exports = {
  findUserByIdAndUpdate,
  findUserByEmail,
  updateUserById,
  userCollection,
  findVerificationToken,
};
