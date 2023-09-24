import nodemailer from "nodemailer";
import { config } from "../app.config.js";

export const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    service: config.emailHost,
    port: config.emailPort,
    auth: {
      user: config.emailUserName,
      password: config.emailPassword,
    },
  });

  const emailOptions = {
    from: "SaraCart Support<support@saracart.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(emailOptions);
};
