import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await db
      .collection("users")
      .insertOne({ email, password: hashedPassword });
    return new Response(JSON.stringify({ message: "User created" }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }
}
