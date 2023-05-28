import express from "express";
import mongoose from "mongoose";

import { config } from "./app.config.js";

import authRouter from "./api/v1/routes/auth.js";
import userRouter from "./api/v1/routes/user.js";
import productRouter from "./api/v1/routes/product.js";
import cartRouter from "./api/v1/routes/cart.js";
import orderRouter from "./api/v1/routes/order.js";

const app = express();

mongoose
  .connect(config.mongooseUrl)
  .then(() => {
    console.log("db connection is successful");
    startServer();
  })
  .catch((err) => console.log(err));

const startServer = () => {
  app.use(express.json());
  app.use(process.env.API_BASEPATH, [
    authRouter,
    userRouter,
    productRouter,
    cartRouter,
    orderRouter,
  ]);

  app.listen(config.port, () => {
    console.log(`backend server is running on port ${config.port}`);
  });
};
