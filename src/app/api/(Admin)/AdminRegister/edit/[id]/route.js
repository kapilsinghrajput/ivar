import { AdminModel } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

// EDIT API
export async function PATCH(request, { params }) {
  const { id } = params;
  const {  oldpassword, newpassword } = await request.json();


  console.log("backend side ==>", oldpassword , newpassword);
  

  try {
    await connectToDb();

    // Fetch the user by ID
    const user = await AdminModel.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Compare old password with the stored hashed password
    const isMatch = await bcryptjs.compare(oldpassword, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Old password is incorrect" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedNewPassword = await bcryptjs.hash(newpassword, 10);

    // Update the password in the database
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200, success: true }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { message: "Error updating password", error },
      { status: 500 }
    );
  }
}
