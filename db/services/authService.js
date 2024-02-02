const User = require("../models/userModel");

const findUserByEmail = async (email) => {
  const user = await User.findOne(email);
  return user;
};

const updateUserById = async (id, token) => {
  const user = await User.findByIdAndUpdate(id, token);
  return user;
};

const userCollection = (body, avatar) => {
  const user = new User(body, avatar);
  return user;
};

const verifyEmailByToken = async (id, { verify, verificationToken }) => {
  const user = await User.findByIdAndUpdate(id, {
    verify,
    verificationToken,
  });
  return user;
};

const findUserByIdAndUpdate = async (id, { verify }) => {
  const user = await User.findByIdAndUpdate(id, { verify });
  return user;
};

module.exports = {
  findUserByIdAndUpdate,
  findUserByEmail,
  updateUserById,
  userCollection,
  verifyEmailByToken,
};
