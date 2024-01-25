const Joi = require("joi");

const waterSchemas = Joi.object({
  waterVolume: Joi.number()
    .min(1)
    .max(15000)
    .required()
    .messages({ "any.required": "missing required waterVolume field" }),
  date: Joi.date()
    .required()
    .messages({ "any.required": "missing required date field" }),
});

const schemas = {
  waterSchemas,
};
module.exports = { schemas };
