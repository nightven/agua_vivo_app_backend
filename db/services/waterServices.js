const User = require("../models/userModel");
const Water = require("../models/waterModel");

const addAmountWater = async (body) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  // Якщо години = 0, переведемо на 12
  hours = hours ? hours : 12;
  // Додаємо нуль перед хвилинами, якщо вони менше 10
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const time = hours + ":" + minutes + " " + ampm;

  const newAmount = await Water.create({
    ...body,
    date,
    month,
    day,
    time,
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
  const  user  = await User.findOne({ _id: owner });
    
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
