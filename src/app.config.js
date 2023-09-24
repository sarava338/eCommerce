export const config = {
  port: process.env.PORT,
  mongooseUrl: process.env.MONGO_URL,
  apiBasePath: process.env.API_BASEPATH,
  jwtSecret: process.env.JWT_SECRET,
  cryptoSycret: process.env.CRYPTO_SECRET,
  emailHost: process.env.EMAIl_HOST,
  emailPort: process.env.EMAIL_PORT,
  emailUserName: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
};
