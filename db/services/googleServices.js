const User = require("../models/userModel");

const createUser = async ({ name, email, avatar, verify, password }) => {
  const user = await User.create({
    name,
    email,
    avatar,
    verify,
    password,
  });
  return user;
};

const googleCollection = async ({ name, email, avatar, verify, password }) => {
  const user = new User({ name, email, avatar, verify, password });
  await user.hashPassword();
  await user.save();
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
  googleCollection,
  createUser,
  findUserByEmail,
  updateUserById,
};
