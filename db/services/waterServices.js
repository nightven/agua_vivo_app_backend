const User = require("../models/userModel");
const Water = require("../models/waterModel");

const addAmountWater = async (body, dailyNorma, owner) => {
  const date = new Date();

  const waterList = await Water.findOne({
    date: {
      $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    },
    owner,
  });
  console.log(waterList);
  if (waterList) {
    return Water.findByIdAndUpdate(
      waterList._id,
      {
        $inc: { totalVolume: body.waterVolume },
        $push: { entries: body },
      },
      { new: true }
    );
  }

  const newAmount = await Water.create({
    date,
    dailyNorma,
    entries: [body],
    totalVolume: body.waterVolume,
    owner,
  });

  return newAmount;
};

const updateAmountWater = async ({ owner, waterId, waterVolume, date }) => {
  const updatedWater = await Water.findOneAndUpdate(
    { _id: waterId, owner },
    { waterVolume, date, owner },
    { new: true }
  );

  return updatedWater;
};

const deleteAmountWater = async ({ waterId, owner }) => {
  const deletedAmount = await Water.findByIdAndDelete({ _id: waterId, owner });

  return deletedAmount;
};

const getDailyNorm = async (owner) => {
  const user = await User.findOne({ _id: owner });

  return user.dailyNorma;
};

const getAmountWaterDaily = async ({ owner, day }) => {
  const amountDaily = await Water.find({ owner, day });

  return amountDaily;
};

const getAmountMonthlyFromDb = async ({ owner, month }) => {
  const amountMonthly = await Water.find({ owner, month });

  return amountMonthly;
};

module.exports = {
  getDailyNorm,
  addAmountWater,
  updateAmountWater,
  deleteAmountWater,
  getAmountWaterDaily,
  getAmountMonthlyFromDb,
};
