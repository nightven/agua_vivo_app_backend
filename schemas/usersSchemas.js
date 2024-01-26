const Joi = require("joi");

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .pattern(emailRegExp)
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .required()
    .min(8)
    .max(64)
    .message({ "any.required": "missing required password field" }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(emailRegExp)
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .required()
    .min(8)
    .max(64)
    .message({ "any.required": "missing required password field" }),
});

const updateSchema = Joi.object({
  gender: Joi.string().valid("Woman", "Man"),
  password: Joi.string().min(8).max(64),
});

const waterRateSchema = Joi.object({
  gender: Joi.string()
    .valid("Woman", "Man"),
  weight: Joi.number()
    .required()
    .messages({ "any.required": "missing required weight field" }),
  sportTime: Joi.number()
    .required()
    .messages({ "any.required": "missing required sportTime field" }),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
  waterRateSchema,
};

module.exports = { schemas };
