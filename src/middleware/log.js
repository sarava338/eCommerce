import Log from "../libraries/Log.js";

export const logEveryRequest = (req, res, next) => {
  Log.info(req.method, req.originalUrl);
  next();
};