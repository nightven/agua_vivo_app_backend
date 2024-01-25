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

const newAvatar = async (id, avatar) => {
  const newAvatar = await User.findByIdAndUpdate(id, avatar);
  return newAvatar;
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
  userCollection,
  updateUserById,
  newAvatar,
  findUserById,
};
