import { createClient } from "@supabase/supabase-js";
import clientPromise from "../lib/mongodb";
import { generateToken, verifyToken } from "../lib/jwt";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const client = await clientPromise;
const db = client.db("your-database-name");
const users = db.collection("users");

export const signInWithProvider = async (provider) => {
  const { error, user } = await supabase.auth.signInWithOAuth({ provider });

  if (error) throw error;

  // Save user in MongoDB
  await users.updateOne(
    { id: user.id },
    { $set: { email: user.email, provider } },
    { upsert: true }
  );

  // Generate JWT
  const token = generateToken({ id: user.id, email: user.email });
  return token;
};

export const signUp = async (email, password) => {
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  // Save user in MongoDB
  await users.updateOne(
    { email },
    { $set: { email, provider: "supabase" } },
    { upsert: true }
  );
};

export const signOut = async () => {
  await supabase.auth.signOut();
};

export const getUser = async (token) => {
  const user = verifyToken(token);
  if (!user) return null;

  return await users.findOne({ id: user.id });
};
