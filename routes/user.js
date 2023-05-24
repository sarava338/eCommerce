const router = require("express").Router();

router.get("/get", (req, res) => {
  res.send("user test success");
});

router.post("/", (req, res) => {
  const username = req.body.username;
  res.send(`your username is ${username}`);
});

export default router;