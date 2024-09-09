import { verifyToken } from "../lib/jwt";

export const authenticate = (handler) => async (req, res) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const user = verifyToken(token);
  if (!user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  req.user = user;
  return handler(req, res);
};
