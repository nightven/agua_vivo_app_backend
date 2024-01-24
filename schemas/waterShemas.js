const Joi = require("joi");

const { Schema, model } = require("mongoose");

const handleMongooseError = require("../helpers/handleMongooseError");


const waterRateSchema = Joi.object({
  waterRate: Joi.number()
    .min(1)
    .max(15000)
    .required()
    .message({ "any.required": "missing required waterRate field" }),
});

const waterNotes = Joi.object({
  waterVolume: Joi.number()
    .min(1)
    .max(15000)
    .required()
    .message({ "any.required": "missing required waterVolume field" }),

  date: Joi.date()
    .required()
    .message({ "any.required": "missing required date field" }),
});

const schemas = {
  waterRateSchema,
  waterNotes,
};

module.exports = { schemas };
