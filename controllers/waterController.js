const { findUserById } = require("../db/services/userServices");
const {
  addAmountWater,
  updateAmountWater,
  deleteAmountWater,
  getEntriesDaily,
  getEntriesMonthly,
  findOneWater,
} = require("../db/services/waterServices");
const { ctrlWrapper, httpError, amountMonthly } = require("../helpers");

const addWater = async (req, res) => {
  const { waterVolume } = req.body;
  const { _id: owner } = req.user;
  const { dailyNorma } = await findUserById(owner);

  if (waterVolume > 5000) {
    throw httpError(400, "waterVolume cannot exceed 5000");
  }

  const amountWater = await addAmountWater(req.body, dailyNorma, owner);

  if (!amountWater) {
    throw httpError(404);
  }

  res.status(200).json({
    id: amountWater.id,
    waterVolume: amountWater.waterVolume,
    time: amountWater.time,
  });
};

const updateWater = async (req, res) => {
  const { id, waterVolume, time } = req.body;
  const { _id: owner } = req.user;

  if (waterVolume > 5000) {
    throw httpError(400, "waterVolume cannot exceed 5000");
  }

  const updatedWater = await updateAmountWater({
    owner,
    id,
    waterVolume,
    time,
  });

  if (!updatedWater) {
    throw httpError(404);
  }

  res.json({
    id: updatedWater.id,
    waterVolume: updatedWater.waterVolume,
    time: updatedWater.time,
  });
};

const deleteWater = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.body;
  console.log(id);
  const water = await findOneWater(id);
  console.log(water);
  if (!water) {
    throw httpError(404);
  }

  const deletedWater = await deleteAmountWater({ id, owner });

  if (!deletedWater) {
    throw httpError(404);
  }

  res.json({ message: "Successfully deleted" });
};

const getToDay = async (req, res) => {
  const { _id: owner } = req.user;

  const dailyWater = await getEntriesDaily(owner);

  if (!dailyWater) {
    throw httpError(404);
  }

  res.json({
    amountOfWater: dailyWater.amountOfWater,
    percentage: Math.floor(dailyWater.percentage),
    entries: dailyWater.entries,
  });
};

const getMonthly = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.body;

  const amountOfMonth = await getEntriesMonthly({ owner, date });

  if (!amountOfMonth.length) {
    throw httpError(404);
  }

  res.json({ month: amountOfMonth });
};

module.exports = {
  addWater: ctrlWrapper(addWater),
  updateWater: ctrlWrapper(updateWater),
  deleteWater: ctrlWrapper(deleteWater),
  getToDay: ctrlWrapper(getToDay),
  getMonthly: ctrlWrapper(getMonthly),
};
