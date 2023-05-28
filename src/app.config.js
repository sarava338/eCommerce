import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  mongooseUrl: process.env.MONGO_URL,
};
