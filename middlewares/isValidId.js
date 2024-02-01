const { isValidObjectId } = require("mongoose");
const { httpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { waterId } = req.params;

  if (!isValidObjectId(waterId)) {
    next(httpError(400, `${waterId} is not a valid id`));
  }
  next();
};

module.exports = isValidId;
