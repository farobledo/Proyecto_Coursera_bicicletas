// Intalar esta libreria  npm i nodemailer-sendgrid-transport

const { parseTwoDigitYear } = require("moment");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const SMTPConnection = require("nodemailer/lib/smtp-connection");

let mailconfig;
if (process.env.NODE_ENV === "production") {
  const option = {
    auth: {
      api_key: process.env.SENGRIF_API_SECRET,
    },
  };
  mailconfig = asgTransport(option);
} else {
  if (process.env.NODE_ENV === "staging") {
    console.log("xxxxxxxx");
    const option = {
      auth: {
        api_key: process.env.SENGRIF_API_SECRET,
      },
    };
    mailconfig = sgTransport(option);
  } else {
    mailconfig = {
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.ethereal_user,
        pass: process.env.ethereal - parseTwoDigitYear,
      },
    };
  }
}



module.exports = nodemailer.createTransport(mailconfig);
