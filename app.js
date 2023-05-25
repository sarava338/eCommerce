import express from "express";
import mongoose from "mongoose";
import userRouter from "./src/routes/user.js";
import authRouter from "./src/routes/auth.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

async function main() {
  mongoose.connect(process.env.MONGO_URL);
}
main()
  .then(() => console.log("db connection is successful"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(process.env.API_BASEPATH, authRouter, userRouter);

app.listen(PORT, () => {
  console.log(`backend server is running on port ${PORT}`);
});
