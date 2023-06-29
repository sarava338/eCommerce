import express from "express";
import mongoose from "mongoose";

import { config } from "./app.config.js";

import adminRouter from "./routes/admin.route.js"
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import Log from "./libraries/Log.js";
import {
  logEveryRequest,
} from "./middleware/log.middleware.js";

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
