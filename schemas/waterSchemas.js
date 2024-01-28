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
  date: Joi.date()
    .required()
    .messages({ "any.required": "missing required day field" }),
  id: Joi.string()
    .required()
    .messages({ "any.required": "missing required id field" }),
});

const dailySchemas = Joi.object({
  day: Joi.number()
    .min(1)
    .max(31)
    .required()
    .messages({ "any.required": "missing required day field" }),
});

const monthlySchemas = Joi.object({
  month: Joi.number()
    .min(1)
    .max(12)
    .required()
    .messages({ "any.required": "missing required month field" }),
});
const schemas = {
  waterSchemas,
  updateWaterSchemas,
  dailySchemas,
  monthlySchemas,
};
module.exports = { schemas };
