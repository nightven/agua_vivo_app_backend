const {
  addAmountWater,
  updateAmountWater,
  deleteAmountWater,
  getAmountWaterDaily,
} = require("../db/services/waterServices");
const { ctrlWrapper, httpError, amountDailyNorm } = require("../helpers");

const addWater = async (req, res) => {
  const { waterVolume, day } = req.body;
  const { _id: owner } = req.user;

  if (waterVolume > 5000) {
    res.status(400).json({ message: "waterVolume cannot exceed 5000" });
  }

  const amountWater = await addAmountWater({ waterVolume, owner });

  if (!amountWater) {
    throw httpError(404);
  }

  res.status(200).json({
    id: amountWater.id,
    waterVolume: amountWater.waterVolume,
    day: amountWater.day,
    date: amountWater.date,
  });
};

const updateWater = async (req, res) => {
  const { id, waterVolume, day } = req.body;
  const { _id: owner } = req.user;

  const updatedWater = await updateAmountWater({
    owner,
    waterId: id,
    waterVolume,
    day,
  });

  if (!updatedWater) {
    throw httpError(500);
  }

  res.json({
    id: updatedWater.id,
    waterVolume: updatedWater.waterVolume,
    day: updatedWater.day,
    date: updatedWater.date,
  });
};

const deleteWater = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const deletedWater = await deleteAmountWater({ waterId: id, owner });

  if (!deletedWater) {
    throw httpError(404);
  }

  res.json({ message: "Successfully deleted" });
};

const getAmountDaily = async (req, res) => {
  const { _id: owner } = req.user;
  const { day } = req.body;

  const amount = await getAmountWaterDaily({ owner, day });

  if (!amount) {
    throw httpError(404);
  }

  const percentage = amountDailyNorm(amount);

  res.json({ percentage, dailyNorm: 2000, countofday: amount });
};

module.exports = {
  addWater: ctrlWrapper(addWater),
  updateWater: ctrlWrapper(updateWater),
  deleteWater: ctrlWrapper(deleteWater),
  getAmountDaily: ctrlWrapper(getAmountDaily),
};
