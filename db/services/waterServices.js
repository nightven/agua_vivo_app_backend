const User = require("../models/userModel");
const Water = require("../models/waterModel");

const findWaterByDate = async ({ owner, date }) => {
  const water = await Water.findOne({
    date: {
      $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    },
    owner,
  });
  return water;
};

const getDailyNorma = async (owner) => {
  const user = await User.findOne({ _id: owner });

  return user.dailyNorma;
};

const createWater = async ({ owner, dailyNorma, date }) => {
  const newEntries = await Water.create({
    date,
    dailyNorma,
    entries: [],
    totalVolume: 0,
    owner,
  });
  return newEntries;
};

const addAmountWater = async ({ body, owner, waterId }) => {
  const { entries } = await Water.findByIdAndUpdate(
    { _id: waterId, owner },
    {
      $inc: { totalVolume: +body.waterVolume },
      $push: { entries: body },
    },
    { new: true }
  );

  return entries[entries.length - 1];
};

const updateAmountWater = async ({ owner, body, oldWaterVolume }) => {

  const updatedWater = await Water.findOneAndUpdate(
    { "entries._id": body.id, owner },
    {
      $set: {
        "entries.$.waterVolume": body.waterVolume,
        "entries.$.time": body.time,
      },
      $inc: { totalVolume: body.waterVolume - oldWaterVolume },
    },
    { new: true }
  );

  return updatedWater;
};

const deleteAmountWater = async ({ waterId, owner, waterVolume, date }) => {

  const deletedAmount = await Water.findOneAndUpdate(
    {
      date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      },
      owner,
    },
    {
      $inc: { totalVolume: -waterVolume },
      $pull: { entries: { _id: waterId } },
    },
    { new: true }
  );

  return deletedAmount;
};

const getEntriesDaily = async ({owner, date}) => {
 
  const waterData = await Water.findOne({
    date: {
      $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    },
    owner,
  });

  return waterData;
};

const getEntriesMonthly = async ({ owner, startDate, endDate }) => {

  const waterOfMonth = await Water.find({
    date: { $gte: startDate, $lte: endDate },
    owner,
  });

  return waterOfMonth;
};

const updateDailyNorma = async ({ owner, dailyNorma }) => {
  const date = new Date();

  const waterData = await Water.findOneAndUpdate(
    {
      date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      },
      owner,
    },
    { dailyNorma },
    { mew: true }
  );
  return waterData;
};

module.exports = {
  getDailyNorma,
  findWaterByDate,
  createWater,
  addAmountWater,
  updateAmountWater,
  deleteAmountWater,
  getEntriesDaily,
  getEntriesMonthly,
  updateDailyNorma,
};
