
const { amountMonthly, httpError } = require("../../helpers");
const User = require("../models/userModel");
const Water = require("../models/waterModel");

const createWater = async ({ owner, dailyNorma }) => {
  const date = new Date();
  const newEntries = await Water.create({
    date,
    dailyNorma,
    entries: [],
    totalVolume: 0,
    owner,
  });
  return newEntries;
};

const addAmountWater = async (body, owner) => {
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
  const newWater = await createWater({
    owner,
    dailyNorma: 2,
  });
  if (!newWater) {
    throw httpError(400);
  }

  const newEntry = newWater.entries[newWater.entries.length - 1];

  return newEntry;
};

const updateAmountWater = async ({ owner, id, waterVolume, time }) => {
  const water = await Water.findOne({ "entries._id": id, owner });

  if (!water) {
    throw httpError(404);
  }

  const oldWaterVolume = water.entries.find(
    (entry) => entry._id.toString() === id
  ).waterVolume;

  const updatedWater = await Water.findOneAndUpdate(
    { "entries._id": id, owner },
    {
      $set: { "entries.$.waterVolume": waterVolume, "entries.$.time": time },
      $inc: { totalVolume: waterVolume - oldWaterVolume },
    },
    { new: true }
  );

  const updatedEntry = updatedWater.entries.find(
    (entry) => entry._id.toString() === id
  );
  return updatedEntry;
};

const deleteAmountWater = async ({ waterId, owner }) => {
  const waterVolume = await getWaterVolume(waterId);

  const deletedAmount = await Water.findOneAndUpdate(
    { owner },
    {
      $inc: { totalVolume: -waterVolume },
      $pull: { entries: { _id: waterId } },
    },
    { new: true }
  );
  return deletedAmount;
};

const getWaterVolume = async (waterId) => {
  const water = await Water.findOne({ "entries._id": waterId });
  const volume = water.entries.find((water) => water.id === waterId);
  return volume.waterVolume;
};

const getDailyNorm = async (owner) => {
  const user = await User.findOne({ _id: owner });

  return user.dailyNorma;
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

const getEntriesDaily = async (owner) => {
  const date = new Date();

  const waterData = await Water.findOne({
    date: {
      $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    },
    owner,
  });

  if (!waterData) {
    return null;
  }

  const dailyWater = {
    amountOfWater: waterData.entries.length,
    percentage: (waterData.totalVolume / (waterData.dailyNorma * 1000)) * 100,
    entries: waterData.entries,
  };

  return dailyWater;
};

const getEntriesMonthly = async ({ owner, date }) => {
  const [year, month] = date.split("-");
  const startDate = new Date(Date.UTC(year, month - 1, 1));
  const endDate = new Date(Date.UTC(year, month, 0));

  const waterOfMonth = await Water.find({
    date: { $gte: startDate, $lte: endDate },
    owner,
  });

  const monthlyWater = amountMonthly(waterOfMonth);
  return monthlyWater;
};

const findOneWater = async (id) => {
  const water = await Water.findOne({ "entries._id": id });
  return water;
};

module.exports = {
  createWater,
  getDailyNorm,
  addAmountWater,
  updateAmountWater,
  deleteAmountWater,
  getEntriesDaily,
  getEntriesMonthly,
  findOneWater,
  updateDailyNorma,
};
