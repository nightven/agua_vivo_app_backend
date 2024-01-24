const { Schema, model } = require("mongoose");

const waterSchemas = new Schema({}, { versionKey: false });

const Water = model("water", waterSchemas);

module.exports = Water;
