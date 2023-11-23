import express from "express";
import mongoose from "mongoose";

import { config } from "./config.js";

import adminRouter from "./routers/admin.js";
import authRouter from "./routers/auth.js";
import userRouter from "./routers/user.js";
import productRouter from "./routers/product.js";
import cartRouter from "./routers/cart.js";
import orderRouter from "./routers/order.js";
import Log from "./libraries/Log.js";
import { logEveryRequest } from "./middleware/log.js";

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
  app.use(express.urlencoded({ extended: true }));

  /** Loging */
  app.use("*", logEveryRequest);

  /** Routes */
  app.use(config.apiBasePath, [
    adminRouter,
    authRouter,
    userRouter,
    productRouter,
    cartRouter,
    orderRouter,
  ]);

  /**  Listen */
  app.listen(config.port, () => {
    Log.success(`server is running on port ${config.port}`);
  });
};
