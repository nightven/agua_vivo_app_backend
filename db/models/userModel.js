const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../helpers");

const userSchemas = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

const User = model("user", userSchemas);

userSchemas.post("save", handleMongooseError);

module.exports = User;
