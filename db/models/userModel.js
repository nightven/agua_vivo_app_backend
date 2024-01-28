const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../helpers");
const bcrypt = require("bcrypt");

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
    gender: {
      type: String,
      enum: ["Woman", "Man"],
      default: "Woman",
    },
    weight: {
      type: String,
    },
    sportTime: {
      type: String,
    },
    dailyNorma: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

userSchemas.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

userSchemas.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchemas);

userSchemas.post("save", handleMongooseError);

module.exports = User;
