const { Schema, model } = require("mongoose");

const handleMongooseError = require("../../helpers/handleMongooseError");
const { regexSchemas } = require("../public/regex");

const entriesSchema = new Schema({
  waterVolume: {
    type: Number,
    required: [true, "Set capacity of water"],
  },
  time: {
    type: String,
    match: regexSchemas.timeRegexp,
    required: [true, "Time is required"],
  },
});

const waterSchema = new Schema(
  {
    date: {
      type: Date,
      match: regexSchemas.dateRegex,
      required: [true, "date is required"],
    },
    dailyNorma: {
      type: Number,
      default: 1500,
      required: [true, "dailyNorma is required"],
    },
    entries: [entriesSchema],
    totalVolume: {
      type: Number,
      default: 0,
      required: [true, "totalVolume is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: false }
);

waterSchema.post("save", handleMongooseError);

const Water = model("water", waterSchema);

module.exports = Water;
