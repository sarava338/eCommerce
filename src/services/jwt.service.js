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
