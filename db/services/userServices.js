const User = require("../models/userModel");

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const updateUserInfo = async (id, body, newInfo) => {
  const userInfo = await User.findByIdAndUpdate(id, body, newInfo);
  return userInfo;
};

const createGoogleUser = async (email, name) => {
  const user = await User.create(email, name);
  return user;
};

module.exports = {
  findUserById,
  updateUserInfo,
  createGoogleUser,
};
