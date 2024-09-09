import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export function signJwt(payload) {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

export function verifyJwt(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}
