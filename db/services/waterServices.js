const Water = require('../models/waterModel')


const addAmountWater = async (body) => {
    const newAmount = await Water.create(body);
    return newAmount;
 }

const updateAmountWater = async ({ userId, day }) => {

    const updatedAmountWater = await Water.findOne({ _id: userId, day })

    return updatedAmountWater;
 }

const deleteAmountWater = async ({ userId }) => { 
    
    const deleteAmount = await Water.findByIdAndDelete(userId);

    return deleteAmount;
}

const getAmountWaterDaily = async ({ userId, day }) => {

    const amountDaily = await Water.find({ _id: userId, day });

    return amountDaily;
 }

const getAmountWaterMonthly = async ({ userId, month }) => {

    const amountMonthly = await Water.find({ _id: userId, month });

    return amountMonthly;
}
 
module.exports = {
  addAmountWater,
  updateAmountWater,
  deleteAmountWater,
  getAmountWaterDaily,
  getAmountWaterMonthly,
};