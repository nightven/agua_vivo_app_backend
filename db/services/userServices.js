const User = require("../models/userModel");

const createUser = async (body, password) => {
  const user = await User.create(body, password);
  return user;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne(email);
  return user;
};

const userCollection = (body, avatar) => {
  const user = new User(body, avatar);
  return user;
};

const updateUserById = async (id, token) => {
  const user = await User.findByIdAndUpdate(id, token);
  return user;
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const updateUserInfo = async (id, body, newInfo) => {
  const userInfo = await User.findByIdAndUpdate(id, body, newInfo);
  return userInfo;
};

module.exports = {
  createUser,
  findUserByEmail,
  userCollection,
  updateUserById,
  findUserById,
  updateUserInfo,
};
