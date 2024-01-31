const { httpError } = require("../helpers");

const isValidMonth = (req, res, next) => {
  const { date } = req.params;
  const regex = /^\d{4}-(0[1-9]|1[0-2])$/;

  if (!regex.test(date)) {
    return next(httpError(400, `Invalid date format ${date}. Use YYYY-MM`));
  }

  next();
};

module.exports = isValidMonth;
