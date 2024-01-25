const { Schema, model } = require("mongoose");

const handleMongooseError = require("../../helpers/handleMongooseError");

const waterSchema = new Schema(
  {
    waterVolume: {
      type: Number,
      required: [true, "waterVolume is required"],
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
  },
  { versionKey: false, timestamps: false }
);

waterSchema.post("save", handleMongooseError);

const Water = model("water", waterSchema);

module.exports = Water;
