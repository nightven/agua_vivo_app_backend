const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "natasha.kulibaba0703@meta.ua",
    pass: META_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Ignore SSL certificate validation
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "natasha.kulibaba0703@meta.ua" };
  try {
    await transport.sendMail(email);
    console.log("Email send success");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
  return true;
};

module.exports = sendEmail;
