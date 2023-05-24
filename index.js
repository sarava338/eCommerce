import express from "express";
import mongoose from "mongoose";
import userRouter from "./src/routes/user.js";
import authRouter from "./src/routes/auth.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection is successful"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(`backend server is running on port ${PORT}`);
});
