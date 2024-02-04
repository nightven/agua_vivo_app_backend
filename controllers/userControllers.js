const { httpError, ctrlWrapper } = require("../helpers");

const { findUserById, updateUserInfo } = require("../db/services/userServices");
const { updateDailyNorma } = require("../db/services/waterServices");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) {
    throw httpError(400, "No file");
  }
  const avatarURL = req.file.path;
  const user = await findUserById(_id);
  console.log(user);

  if (!user) {
    throw httpError(404);
  }

  user.avatar = avatarURL;
  user.save();

  res.json({ avatar: user.avatar });
};

const getInfo = async (req, res) => {
  const { _id } = req.user;
  const user = await findUserById(_id);

  if (!user) {
    throw httpError(404);
  }
  res.json({
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      gender: user.gender,
      dailyNorma: user.dailyNorma,
    },
  });
};

const updateInfo = async (req, res) => {
  const { _id } = req.user;
  const { name, gender, password, newPassword } = req.body;

  let updatedUser;

  if (password && newPassword) {
    if (password === newPassword) {
      throw httpError(401, "The new password cannot be equal to the old one");
    }

    const user = await findUserById(_id);
    if (!user) {
      throw httpError(404);
    }

    const comparePasswords = await user.comparePassword(password);
    if (!comparePasswords) {
      throw httpError(401, "Password is wrong");
    }

    updatedUser = await updateUserInfo(
      _id,
      { name, gender, password: newPassword },
      { new: true }
    );
    console.log(updatedUser);

    await updatedUser.hashPassword();
    await updatedUser.save();
    console.log(updatedUser);
  } else {
    updatedUser = await updateUserInfo(_id, { name, gender }, { new: true });
    if (!updatedUser) {
      throw httpError(404);
    }
  }

  res.json({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      gender: updatedUser.gender,
    },
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
  const norma = await updateDailyNorma({ owner: _id, dailyNorma });
  if (!norma) {
    throw httpError(404);
  }

  res.json({ dailyNorma });
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
  getInfo: ctrlWrapper(getInfo),
  updateInfo: ctrlWrapper(updateInfo),
  dailyNorm: ctrlWrapper(dailyNorm),
};
