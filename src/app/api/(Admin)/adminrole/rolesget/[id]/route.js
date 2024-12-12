import { AdminRoleModel } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

// GET by ID - Fetch a single user by ID
export const GET = async (request, { params }) => {
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
