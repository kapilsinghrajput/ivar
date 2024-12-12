import { AdminModel, AdminRoleModel } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const POST = async (request) => {
  try {
    // Parse the request JSON
    const { firstname, lastname, email, password, usertype, rolename } =
      await request.json();

    console.log(
      "yyyyyy===",
      firstname,
      lastname,
      email,
      password,
      usertype,
      rolename
    );

    // Connect to the database
    await connectToDb();

    // get role
    const role = await AdminRoleModel.findOne({ rolename });

    if (!role) {
      console.log("Role not found");
      return;
    }

    // Check if the user already exists
    const isUser = await AdminModel.findOne({ email });
    if (isUser) {
      console.log("User already exists");
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Generate a salt and hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const user = new AdminModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      usertype: Number(usertype),
      rolename,
      role_id: role._id,
    });

    // Save the user to the database
    await user.save();
    console.log("User created successfully");

    // Return a success response
    return NextResponse.json({
      message: "User created successfully",
      data: user,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error("Error in AdminRegister route:", error); // Log detailed error information
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};

// GET

export const GET = async (request) => {
  try {
    await connectToDb();

    const Users = await AdminModel.find();

    return NextResponse.json({
      message: "User fetched successfully",
      data: Users,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
