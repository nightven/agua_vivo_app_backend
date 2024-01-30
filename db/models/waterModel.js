const { Schema, model } = require("mongoose");

const handleMongooseError = require("../../helpers/handleMongooseError");

const timeRegexp = /^([0-9]{2}):([0-9]{2}) (AM|PM)$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

const entriesSchema = new Schema({
  waterVolume: {
    type: Number,
    required: [true, "Set capacity of water"],
  },
  time: {
    type: String,
    match: timeRegexp,
    required: [true, "Time is required"],
  },
});

const waterSchema = new Schema(
  {
    date: {
      type: Date,
      match: dateRegex,
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
