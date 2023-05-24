import pkg from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js";


const { express } = pkg;
const app = express();

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection is successful"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  console.log(`backend server is running on port ${PORT}`);
});
