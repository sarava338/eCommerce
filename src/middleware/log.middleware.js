import Log from "../libraries/Log.js";

export const logEveryRequest = (req, res, next) => {
  Log.info(
    "---REQUEST---",
    "[METHOD]",
    req.method,
    "[URL]",
    req.originalUrl,
    "[BODY]",
    req.body
  );
  next();
};

export const logEveryResponse = (req, res, next) => {
  const statusCode = res.statusCode;
  if (statusCode >= 200 && statusCode < 300)
    Log.success(
      "---RESPONSE---",
      "[METHOD]",
      req.method,
      "[URL]",
      req.originalUrl,
      "[CODE]",
      statusCode
    );
  else if (statusCode >= 400 && statusCode < 600)
    Log.error(
      "---RESPONSE---",
      "[METHOD]",
      req.method,
      "[URL]",
      reqqq.originalUrl,
      "[CODE]",
      statusCode
    );
  next();
};
