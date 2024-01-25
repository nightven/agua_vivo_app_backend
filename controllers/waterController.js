const { addAmountWater } = require("../db/services/waterServices");
const { ctrlWrapper } = require("../helpers");

const addWater = async (req, res) => {
  const {waterVolume} = req.body;
  console.log(req.body)

  if (waterVolume > 5000) {
    res.status(400).json({ message: "waterVolume cannot exceed 5000" });
  }

  const amountWater = await addAmountWater(req.body);

  res.status(200).json({
    amountWater,
  });
};

module.exports = {
  addWater: ctrlWrapper(addWater),
};
