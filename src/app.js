import express from "express";
import mongoose from "mongoose";

import { config } from "./app.config.js";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";
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
  app.use(express.urlencoded({ extended: true }));

  /** Loging every request */
  app.use("*", (req, res, next) => {
    Log.info(
      "[METHOD]",
      req.method,
      "[URL]",
      req.originalUrl,
      "[BODY]",
      req.body
    );
    next();
  });

  /** Routes */
  app.use(config.apiBasePath, [
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
