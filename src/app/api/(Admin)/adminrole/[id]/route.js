import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { AdminRoleModel } from "@/lib/models";

// DELETE API ROUTE

export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    // Connect to the database
    await connectToDb();

    // Find and delete the user by ID
    const userRole = await AdminRoleModel.findByIdAndDelete(id);

    if (!userRole) {
      return NextResponse.json(
        { message: "userRole not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "userRole deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete userRole", error },
      { status: 500 }
    );
  }
}

// EDIT API
export async function PATCH(request, { params }) {
  const { id } = params;
  const { rolename, roles } = await request.json();

  const trueRoles = Object.keys(roles).filter((key) => roles[key] === true);

  try {
    // Connect to database
    await connectToDb();

    // Update the role by ID
    const updatedRole = await AdminRoleModel.findByIdAndUpdate(
      id,
      { rolename, roles: trueRoles },
      { new: true }
    );

    if (!updatedRole) {
      return NextResponse.json({ message: "Role not found" }, { status: 404 });
    }

    // Return success response
    return NextResponse.json(
      { message: "Role updated successfully", role: updatedRole },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json(
      { message: "Error updating role", error },
      { status: 500 }
    );
  }
}

// GET by ID - Fetch a single user by ID
export const GET = async (request, { params }) => {
  // const { userid } = await request.json();

  try {
    await connectToDb();

    const { id } = await params;

    const userRole = await AdminRoleModel.findById(id);

    if (!userRole) {
      return NextResponse.json(
        { error: "userRole not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "userRole fetched successfully",
      data: userRole,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching userRole by ID:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};
