const { findUserById } = require("../db/services/userServices");
const {
  getDailyNorm,
  addAmountWater,
  updateAmountWater,
  deleteAmountWater,
  getAmountWaterDaily,
  getAmountMonthlyFromDb,
} = require("../db/services/waterServices");
const {
  ctrlWrapper,
  httpError,
  amountDailyNorm,
  amountMonthly,
} = require("../helpers");

const addWater = async (req, res) => {
  const { waterVolume } = req.body;
  const { _id: owner } = req.user;
  const { dailyNorma } = await findUserById(owner);

  if (waterVolume > 5000) {
    res.status(400).json({ message: "waterVolume cannot exceed 5000" });
  }

  const amountWater = await addAmountWater(req.body, dailyNorma, owner);

  if (!amountWater) {
    throw httpError(404);
  }

  res.status(200).json({
    id: amountWater.id,
    waterVolume: amountWater.waterVolume,
    date: amountWater.date,
  });
};

const updateWater = async (req, res) => {
  const { id, waterVolume, date } = req.body;
  const { _id: owner } = req.user;

  const updatedWater = await updateAmountWater({
    owner,
    waterId: id,
    waterVolume,
    date,
  });

  if (!updatedWater) {
    throw httpError(404);
  }

  res.json({
    id: updatedWater.id,
    waterVolume: updatedWater.waterVolume,
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

  if (typeof day !== "number") {
    throw httpError(400, "Invalid type of day, most be number");
  }

  const amountOfDay = await getAmountWaterDaily({ owner, day });

  if (!amountOfDay) {
    throw httpError(404);
  }
  const dailyNorm = await getDailyNorm(owner);

  const percentage = amountDailyNorm({ amountOfDay, dailyNorm });

  res.json({ percentage, countofday: amountOfDay });
};

const getAmountMonthly = async (req, res) => {
  const { _id: owner } = req.user;
  const { month } = req.body;

  const amountOfMonth = await getAmountMonthlyFromDb({ owner, month });
  let dailyNorm = await getDailyNorm(owner);

  dailyNorm = dailyNorm === "" ? 1800 : dailyNorm;

  if (!amountMonthly) {
    throw httpError(404);
  }
  const formattedAmount = amountMonthly(amountOfMonth, dailyNorm);

  res.json({ month: formattedAmount });
};

module.exports = {
  addWater: ctrlWrapper(addWater),
  updateWater: ctrlWrapper(updateWater),
  deleteWater: ctrlWrapper(deleteWater),
  getAmountDaily: ctrlWrapper(getAmountDaily),
  getAmountMonthly: ctrlWrapper(getAmountMonthly),
};
