const { Schema, model } = require("mongoose");

const userSchemas = new Schema({}, { versionKey: false });

const User = model("user", userSchemas);

module.exports = User;
