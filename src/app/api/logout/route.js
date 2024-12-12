import { NextResponse } from "next/server";

export async function GET() {
  // Delete the cookie using NextResponse
  const response = NextResponse.json({ message: "Logout successful" });
  response.cookies.set("token", "", {
    maxAge: 0, // Setting maxAge to 0 effectively deletes the cookie
    path: "/",
  });

  return response;
}
