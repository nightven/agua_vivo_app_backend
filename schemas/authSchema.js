const Joi = require("joi");
const { regexSchemas } = require("../db/public/regex");

const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .pattern(regexSchemas.emailRegExp)
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
    .pattern(regexSchemas.emailRegExp)
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .required()
    .min(8)
    .max(64)
    .message({ "any.required": "missing required password field" }),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),
});

const resetPassword = Joi.object({
  password: Joi.string().min(8).max(64).required(),
  id: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
  resetPassword,
};

module.exports = { schemas };
