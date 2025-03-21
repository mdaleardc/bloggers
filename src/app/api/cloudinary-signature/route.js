import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req) {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const cloudinarySecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET; // Replace with your API secret

  // Generate a signature
  const signature = crypto
    .createHash("sha1")
    .update(`timestamp=${timestamp}${cloudinarySecret}`)
    .digest("hex");

  return NextResponse.json({ timestamp, signature });
}