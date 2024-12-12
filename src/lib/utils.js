import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SignJWT, jwtVerify } from "jose";
import mongoose from "mongoose";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}



export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,);
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

/////// generate Token//////////

export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
} 

/////// verify Token //////////

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}



