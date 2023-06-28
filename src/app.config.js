import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  mongooseUrl: process.env.MONGO_URL,
  apiBasePath: process.env.API_BASEPATH,
  jwtSecret: process.env.JWT_SECRET,
  cryptoSycret: process.env.CRYPTO_SECRET,
};
