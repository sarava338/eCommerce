import Log from "../libraries/Log.js";

export const logEveryRequest = (req, res, next) => {
  Log.info(
    "---REQUEST---",
    "[METHOD]",
    req.method,
    "[URL]",
    req.originalUrl,
    "[REQ]",
    req.body
  );
  next();
};