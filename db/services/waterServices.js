const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { amountMonthly } = require("../../helpers");
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
  console.log(newEntries);
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
  const waterVolume = await getWaterVolume(id);
  console.log(waterVolume);

  const deletedAmount = await Water.findOneAndUpdate(
    { owner },
    {
      $inc: { totalVolume: -waterVolume },
      $pull: { entries: { _id: id } },
    },
    { new: true }
  );

  return deletedAmount;
};

const getWaterVolume = async (id) => {
  const waterVolume = await Water.findOne({ "entries._id": id });
  return waterVolume.entries[0].waterVolume;
};

const getDailyNorm = async (owner) => {
  const user = await User.findOne({ _id: owner });

  return user.dailyNorma;
};

const getEntriesDaily = async (owner) => {
  const date = new Date();

  const waterData = await Water.findOne({
    date: {
      $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    },
    owner,
  });

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
  console.log(waterOfMonth);

  const monthlyWater = amountMonthly(waterOfMonth);
  return monthlyWater;
};

const findOneWater = async (id) => {
  const water = await Water.findOne({ "entries._id": id });
  return water;
};

module.exports = {
  getDailyNorm,
  addAmountWater,
  updateAmountWater,
  deleteAmountWater,
  getEntriesDaily,
  getEntriesMonthly,
  findOneWater,
};
