const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SEND_GRID } = process.env;

sgMail.setApiKey(SEND_GRID);

const sendEmail = async (data) => {
  const email = { ...data, from: "ostapkriven13@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
