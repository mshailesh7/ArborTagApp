const nodemailer = require("nodemailer");

exports.generateOtp = () => {
  let otp = "";
  for (let i = 0; i < 4; i++) {
    const randVal = Math.round(Math.random() * 9);
    otp += randVal;
  }
  return otp;
};

exports.mailTransport = () =>
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

exports.generatePasswordResetLink = (url) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
  </head>
  <body>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset</h2>
          <p>You have requested to reset your password. Click the button below to reset it:</p>
          <p>
              <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
          </p>
          <p>If you did not request this password reset, you can safely ignore this email.</p>
          <p>Thank you,</p>
          <p>Your Company Name</p>
      </div>
  </body>
  </html>
  `;
};
