const Joi = require("joi");

const updateSchema = Joi.object({
  name: Joi.string(),
  gender: Joi.string().valid("Woman", "Man"),
  password: Joi.string().min(8).max(64),
});

const waterRateSchema = Joi.object({
  dailyNorma: Joi.number()
    .required()
    .max(15)
    .message({ "any.required": "missing required dailyNorma field" }),
});


const schemas = {
  updateSchema,
  waterRateSchema,
};

module.exports = { schemas };
