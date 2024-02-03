const { httpError, ctrlWrapper } = require("../helpers");

const { findUserById, updateUserInfo } = require("../db/services/userServices");
const { updateDailyNorm } = require("../db/services/waterServices");

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
  const { password } = req.body;
  const user = await updateUserInfo(_id, req.body, { new: true });

  if (!user) {
    throw httpError(404);
  }

  if (password) {
    await user.hashPassword();
    user.save();
  }

  res.json({
    user: {
      name: user.name,
      email: user.email,
      gender: user.gender,
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
  const norma = await updateDailyNorm({ owner: _id, dailyNorma });
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
