import { verifyToken } from "../lib/jwt";

export const authenticate = (handler) => async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;
  return handler(req, res);
};
