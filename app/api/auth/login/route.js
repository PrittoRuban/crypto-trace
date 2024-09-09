import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import { signJwt } from "../../../lib/jwt"; // You will create this later

export async function POST(req) {
  const { email, password } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  const token = signJwt({ email: user.email }); // JWT creation
  return new Response(JSON.stringify({ token }), { status: 200 });
}
