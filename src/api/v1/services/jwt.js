import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers;

  if (!authHeader.token)
    return res.status(401).json({ message: "Unathorized token" });

  const token = authHeader.token.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    req.user = user;
    if (err) return res.status(403).json({ message: "Token not valid" });
  });

  next();
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else return res.status(401).json({ message: "Unauthorized user" });
  });
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) next();
    else return res.status(401).json({ message: "Unauthorized user" });
  });
};
