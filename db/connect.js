const mongoose = require("mongoose");

const {DB_HOST} = process.env;

async function dbConnect() {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Db is connected");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = dbConnect;
