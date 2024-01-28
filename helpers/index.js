const ctrlWrapper = require("./ctrlWrapper");
const handleMongooseError = require("./handleMongooseError");
const httpError = require("./httpError");
const sendEmail = require("./sendEmail");
const amountDailyNorm = require("./amountDailyNorm");
const amountNormaLitres = require("./amountNormaLitres");
const amountMonthly = require("./amountMonthly");

module.exports = {
  ctrlWrapper,
  handleMongooseError,
  httpError,
  sendEmail,
  amountDailyNorm,
  amountNormaLitres,
  amountMonthly,
};
