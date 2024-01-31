const User = require("../models/userModel");

const createUser = async ({ name, email, verify, password, avatarURL }) => {
  const user = await User.create({ name, email, verify, password, avatarURL });
  return user;
};

const findUserByEmail = async (email) => {
  const user = await User.findOne(email);
  return user;
};

const updateUserById = async (id, token) => {
  const user = await User.findByIdAndUpdate(id, token);
  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
  updateUserById,
};
