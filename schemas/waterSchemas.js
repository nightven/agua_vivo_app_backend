const Joi = require("joi");
const { regexSchemas } = require("../db/public/regex");

const waterSchemas = Joi.object({
  waterVolume: Joi.number()
    .min(1)
    .max(5000)
    .required()
    .messages({ "any.required": "missing required waterVolume field" }),
  time: Joi.string()
    .regex(regexSchemas.timeRegexp)
    .required()
    .messages({ "any.required": "missing required time field" }),
});

const updateWaterSchemas = Joi.object({
  waterVolume: Joi.number()
    .min(1)
    .max(5000)
    .required()
    .messages({ "any.required": "missing required waterVolume field" }),
  time: Joi.string()
    .regex(regexSchemas.timeRegexp)
    .required()
    .messages({ "any.required": "missing required time field" }),
  id: Joi.string()
    .required()
    .messages({ "any.required": "missing required id field" }),
});

const schemas = {
  waterSchemas,
  updateWaterSchemas,
};
module.exports = { schemas };
