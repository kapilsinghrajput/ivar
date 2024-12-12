import { NextResponse } from "next/server";
import { AdminModel, AdminRoleModel } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

// DELETE API ROUTE

export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    // Connect to the database
    await connectToDb();

    // Find and delete the user by ID
    const user = await AdminModel.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete user", error },
      { status: 500 }
    );
  }
}

// EDIT API
export async function PATCH(request, { params }) {
  const { id } = params;
  const { firstname, lastname, email, usertype, rolename } =
    await request.json();

  try {
    await connectToDb();

    const role = await AdminRoleModel.findOne({ rolename });
    const roleId = role._id;

    const updatedUser = await AdminModel.findByIdAndUpdate(
      id,
      { firstname, lastname, email, usertype, rolename, role_id: roleId },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200, success: true }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error },
      { status: 500 }
    );
  }
}

// GET by ID - Fetch a single user by ID

export const GET = async (request, { params }) => {
  try {
    await connectToDb();

    const { id } = await params;
    const user = await AdminModel.findById(id);

    // const user = await AdminModel.findById(id).populate('role_id');

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User fetched successfully",
      data: user,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};
