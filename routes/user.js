import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("user test success");
});

router.post("/signup", (req, res) => {
  const username = req.body.username;
  res.send(`your username is ${username}`);
});

export default router;