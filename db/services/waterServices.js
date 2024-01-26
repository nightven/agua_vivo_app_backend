const Water = require("../models/waterModel");

const addAmountWater = async (body) => {
    const date = new Date();
    const day = date.getDate();
  const newAmount = await Water.create({ ...body, date, day });
  return newAmount;
};

const updateAmountWater = async ({ owner, waterId, waterVolume, day }) => {
  const date = new Date();

  const updatedWater = await Water.findOneAndUpdate(
    { _id: waterId, owner },
    { waterVolume, date, day, owner },
    { new: true }
  );

  return updatedWater;
};

const deleteAmountWater = async ({ waterId, owner }) => {
  const deletedAmount = await Water.findByIdAndDelete({ _id: waterId, owner });

  return deletedAmount;
};

const getAmountWaterDaily = async ({ owner, day }) => {
  const amountDaily = await Water.find({ owner, day });

  return amountDaily;
};

const getAmountWaterMonthly = async ({ userId, month }) => {
  const amountMonthly = await Water.find({ _id: userId, month });

  return amountMonthly;
};

module.exports = {
  addAmountWater,
  updateAmountWater,
  deleteAmountWater,
  getAmountWaterDaily,
  getAmountWaterMonthly,
};
