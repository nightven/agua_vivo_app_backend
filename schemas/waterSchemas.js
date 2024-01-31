const Joi = require("joi");
const timeRegex = /^(\d{1,2}):(\d{1,2})\s(AM|PM)$/;

const waterSchemas = Joi.object({
  waterVolume: Joi.number()
    .min(1)
    .max(5000)
    .required()
    .messages({ "any.required": "missing required waterVolume field" }),
  time: Joi.string()
    .regex(timeRegex)
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
    .regex(timeRegex)
    .required()
    .messages({ "any.required": "missing required time field" }),
  id: Joi.string()
    .required()
    .messages({ "any.required": "missing required id field" }),
});

// const dailySchemas = Joi.object({
//   date: Joi.string()
//     .required()
//     .messages({ "any.required": "missing required date field" }),
// });

const monthlySchemas = Joi.object({
  date: Joi.string()
    .required()
    .messages({ "any.required": "missing required date field" }),
});

const deleteWaterSchemas = Joi.object({
  id: Joi.string()
    .required()
    .messages({ "any.required": "missing required id field" }),
});
const schemas = {
  waterSchemas,
  updateWaterSchemas,
  monthlySchemas,
  deleteWaterSchemas
};
module.exports = { schemas };
