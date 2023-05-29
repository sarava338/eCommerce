import jwt from "jsonwebtoken";

export const getToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
  return { token };
};

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
    if (!req.user.isAdmin)
      return res.status(401).json({ message: "Unauthorized admin" });
    else next();
  });
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!(req.user.id === req.params.id || req.user.isAdmin))
      return res.status(401).json({ message: "Unauthorized user" });
    else next();
  });
};
