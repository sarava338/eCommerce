import nodemailer from "nodemailer";
import { config } from "../config.js";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: config.smktService,
    port: config.smktPort,
    auth: {
      type: "OAuth2",
      user: config.gmailUserName,
      clientId: config.gmailApiClientId,
      clientSecret: config.gmailApiClientSecret,
      accessToken: config.gmailApiAccessToken,
    },
  });

  const mailOptions = {
    from: `Sara-Cart <${config.emailUserName}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  return await transporter.sendMail(mailOptions);
};
