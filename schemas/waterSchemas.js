const Joi = require("joi");
const timeRegex = /^([0-9]{2}):([0-9]{2}) (AM|PM)$/;

const waterSchemas = Joi.object({
  waterVolume: Joi.number()
    .min(1)
    .max(15000)
    .required()
    .messages({ "any.required": "missing required waterVolume field" }),
  time: Joi.string()
    .regex(timeRegex)
    .required()
    .messages({ "any.required": "missing required date field" }),
});

const updateWaterSchemas = Joi.object({
  waterVolume: Joi.number()
    .min(1)
    .max(15000)
    .required()
    .messages({ "any.required": "missing required waterVolume field" }),
  time: Joi.string()
    .regex(timeRegex)
    .required()
    .messages({ "any.required": "missing required time field" }),
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
