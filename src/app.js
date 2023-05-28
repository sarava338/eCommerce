import express from "express";
import mongoose from "mongoose";

import { config } from "./app.config.js";

import authRouter from "./api/v1/routes/auth.js";
import userRouter from "./api/v1/routes/user.js";
import productRouter from "./api/v1/routes/product.js";
import cartRouter from "./api/v1/routes/cart.js";
import orderRouter from "./api/v1/routes/order.js";
import Log from "./libraries/Log.js";

const app = express();

mongoose
  .connect(config.mongooseUrl)
  .then(() => {
    Log.success("connected to mongoDB");
    startServer();
  })
  .catch((err) => Log.error("mongoDB not connected", err));

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
    Log.success(`server is running on port ${config.port}`);
  });
};
