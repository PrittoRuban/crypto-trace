import { NextResponse } from "next/server";
import { signInWithProvider } from "@/utils/auth";

export async function GET(req) {
  const url = new URL(req.url);
  const provider = url.pathname.split("/")[3];

  const token = await signInWithProvider(provider);
  return NextResponse.redirect(new URL("/dashboard", req.url));
}
