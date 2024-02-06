const { httpError } = require("../helpers");
const { regexSchemas } = require("../db/public/regex");

const isValidMonth = (req, res, next) => {
  const { date } = req.params;

  if (!regexSchemas.monthRegex.test(date)) {
    return next(httpError(400, `Invalid date format ${date}. Use YYYY-MM`));
  }

  next();
};

module.exports = isValidMonth;
