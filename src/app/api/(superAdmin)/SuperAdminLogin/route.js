import { AdminModel } from "@/lib/models";
import { connectToDb, signToken } from "@/lib/utils";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const POST = async (request) => {
  const { email, password } = await request.json();
  console.log("email or password", email, password);

  try {
    await connectToDb();
    const User = await AdminModel.findOne({ email });

    if (!User) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
        { success: false }
      );
    }
    const isPasswordMatch = await bcryptjs.compare(password, User.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 },
        { success: false }
      );
    }

    const token = await signToken({ User });


    const response = NextResponse.json({
      message: "User Login successfully",
      data: User,
      status: 200,
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;

  } catch (error) {
    console.log(error);
  }
};
