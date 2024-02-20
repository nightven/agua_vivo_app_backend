const {
  addAmountWater,
  updateAmountWater,
  deleteAmountWater,
  getEntriesDaily,
  getEntriesMonthly,
  findWaterByDate,
  getDailyNorma,
  createWater,
} = require("../db/services/waterServices");
const { ctrlWrapper, httpError, amountMonthly } = require("../helpers");

const addWater = async (req, res) => {
  const { waterVolume } = req.body;
  const { _id: owner } = req.user;
  const date = new Date();
  let newWater = null;

  if (waterVolume > 5000) {
    throw httpError(400, "waterVolume cannot exceed 5000");
  }

  const dailyNorma = await getDailyNorma(owner);

  newWater = await findWaterByDate({ owner, date });

  if (!newWater) {
    newWater = await createWater({ owner, dailyNorma, date });
  }

  const amountWater = await addAmountWater({
    body: req.body,
    owner,
    waterId: newWater._id,
  });

  if (!amountWater) {
    throw httpError(404);
  }

  res.status(200).json(amountWater);
};

const updateWater = async (req, res) => {
  const {id,  waterVolume } = req.body;
  const { _id: owner } = req.user;
  const date = new Date();

  if (waterVolume > 5000) {
    throw httpError(400, "waterVolume cannot exceed 5000");
  }

  const water = await findWaterByDate({ owner, date });

  if (!water) {
    throw httpError(404);
  }

  const oldWaterVolume = water.entries.find(
    (entry) => entry._id.toString() === id
  ).waterVolume;

  const updatedWater = await updateAmountWater({
    owner,
    body: req.body,
    oldWaterVolume,
  });

  if (!updatedWater) {
    throw httpError(404);
  }

  const updatedEntry = updatedWater.entries.find(
    (entry) => entry._id.toString() === id
  );

  res.json(updatedEntry);

};

const deleteWater = async (req, res) => {
  const { _id: owner } = req.user;
  const { waterId } = req.params;
  const date = new Date();

  const water = await findWaterByDate({owner, date});

  if (!water) {
    throw httpError(404);
  }

  const { waterVolume } = water.entries.find((water) => water.id === waterId);
  
  const deletedWater = await deleteAmountWater({ waterId, owner, waterVolume, date });

  if (!deletedWater) {
    throw httpError(404);
  }

  res.json({ _id: waterId });
};

const getToDay = async (req, res) => {
  const { _id: owner } = req.user;
   const date = new Date();

  const dailyWater = await getEntriesDaily({owner, date});

  if (!dailyWater) {
    res.json([])
  }

  res.json({
    amountOfWater: dailyWater.entries.length,
    percentage: Math.floor(
      (dailyWater.totalVolume / (dailyWater.dailyNorma * 1000)) * 100
    ),
    entries: dailyWater.entries,
  });
};

const getMonthly = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.params;
  const [year, month] = date.split("-");
  const startDate = new Date(Date.UTC(year, month - 1, 1));
  const endDate = new Date(Date.UTC(year, month, 0));

  const waterOfMonth = await getEntriesMonthly({ owner, startDate, endDate });

  const monthlyWater = amountMonthly(waterOfMonth);

  if (!monthlyWater.length) {
    throw httpError(404);
  }

  res.json({ month: monthlyWater });
};

module.exports = {
  addWater: ctrlWrapper(addWater),
  updateWater: ctrlWrapper(updateWater),
  deleteWater: ctrlWrapper(deleteWater),
  getToDay: ctrlWrapper(getToDay),
  getMonthly: ctrlWrapper(getMonthly),
};
