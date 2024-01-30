const User = require("../models/userModel");
const Water = require("../models/waterModel");

const addAmountWater = async (body, dailyNorma, owner) => {
  const date = new Date();

  const waterData = await Water.findOne({
    date: {
      $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    },
    owner,
  });

  if (waterData) {
    const { entries } = await Water.findByIdAndUpdate(
      waterData._id,
      {
        $inc: { totalVolume: +body.waterVolume },
        $push: { entries: body },
      },
      { new: true }
    );

    const lastEntries = entries[entries.length - 1];

    return lastEntries;
  }

  const newEntries = await Water.create({
    date,
    dailyNorma,
    entries: [body],
    totalVolume: body.waterVolume,
    owner,
  });

  const newEntry = newEntries.entries[newEntries.entries.length - 1];

  return newEntry;
};

const updateAmountWater = async ({ owner, id, waterVolume, time }) => {
  const updatedWater = await Water.findOneAndUpdate(
    { "entries._id": id, owner },
    { $set: { "entries.$.waterVolume": waterVolume, "entries.$.time": time } },
    { new: true }
  );

  const updatedEntry = updatedWater.entries.find(
    (entry) => entry._id.toString() === id
  );
  return updatedEntry;
};

const deleteAmountWater = async ({ id, owner }) => {
  const deletedAmount = await Water.findOneAndUpdate(
    { owner },
    { $pull: { entries: { _id: id } } },
    { new: true }
  );

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
