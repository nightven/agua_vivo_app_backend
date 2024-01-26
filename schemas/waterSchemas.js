const Joi = require("joi");

const waterSchemas = Joi.object({
  waterVolume: Joi.number()
    .min(1)
    .max(15000)
    .required()
    .messages({ "any.required": "missing required waterVolume field" }),
});

const updateWaterSchemas = Joi.object({
  waterVolume: Joi.number()
    .min(1)
    .max(15000)
    .required()
    .messages({ "any.required": "missing required waterVolume field" }),
  day: Joi.number()
    .min(1)
    .max(31)
    .required()
    .messages({ "any.required": "missing required day field" }),
  id: Joi.string()
    .required()
    .messages({ "any.required": "missing required id field" }),
});

const schemas = {
  waterSchemas,
  updateWaterSchemas,
};
module.exports = { schemas };
