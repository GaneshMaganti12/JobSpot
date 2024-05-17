const nodeMailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

exports.sendingToMail = asyncHandler((mailDetails) => {
  const mailTransport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "mailforproject96@gmail.com",
      pass: "poyhupnhjplfpsqc",
    },
  });

  mailTransport.sendMail(mailDetails, (err) => {
    if (err) {
      console.log("something error".red, err);
    } else {
      console.log("Email has been sent");
    }
  });
});
