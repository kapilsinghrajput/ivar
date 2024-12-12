import { AdminRoleModel } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    // Parse the request JSON
    const { rolename, roles } = await request.json();

    console.log("rolename, roles, ===", rolename, roles);

    // Extract only role names with true values
    const trueRoles = Object.keys(roles).filter((key) => roles[key] === true);

    console.log("Filtered Role Names ===", trueRoles);

    // Connect to the database
    await connectToDb();

    // Create a new user role
    const userRole = new AdminRoleModel({
      rolename,
      roles: trueRoles, // Store as an array of role names
    });

    // Save the user role to the database
    const savedRole = await userRole.save();
    console.log("Role created successfully");

    // Return a success response
    return NextResponse.json({
      message: "Role created successfully",
      data: savedRole,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error("Role error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};


// GET  //


export const GET = async (request) => {

  try {
   await connectToDb();
  const Users = await AdminRoleModel.find()

      return NextResponse.json({
      message: "roles fetched successfully",
      data: Users,
      status: 200,
      success: true,
    })

  } catch (error) {
    console.log(error);
    
  }

}


///////////////////////




