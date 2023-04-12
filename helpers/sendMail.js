const nodemailer = require("nodemailer");

const { FROM_EMAIL, PASS_EMAIL } = process.env;

const sendEmail = async (data) => {
  const mailerConfigure = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
      user: FROM_EMAIL,
      pass: PASS_EMAIL,
    },
  };

  const transport = nodemailer.createTransport(mailerConfigure);

  const email = { ...data, from: FROM_EMAIL };

  await transport.sendMail(email);

  return true;
};

module.exports = sendEmail;
