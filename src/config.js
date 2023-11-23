import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  mongooseUrl: process.env.MONGO_URL,
  apiBasePath: process.env.API_BASEPATH,
  jwtSecret: process.env.JWT_SECRET,
  cryptoSycret: process.env.CRYPTO_SECRET,
  smktService: process.env.SMTP_SERVICE,
  smktPort: process.env.SMTP_PORT,
  gmailUserName: process.env.GMAIL_USER,
  gmailApiClientId: process.env.GMAIL_API_CLIENT_ID,
  gmailApiClientSecret: process.env.GMAIL_API_CLIENT_SECRET,
  gmailApiAccessToken: process.env.GMAIL_API_ACCESS_TOKEN,
};
