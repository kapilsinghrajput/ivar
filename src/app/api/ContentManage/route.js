// import { PostModel } from "@/lib/models";
// import { connectToDb } from "@/lib/utils";
// import { NextResponse } from "next/server";
// // import cloudinary from "@/lib/cloudinary";
// import { promises as fs } from "fs";
// import path from "path";



// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js body parser to handle file uploads
//   },
// };

// export const POST = async (request) => {
//   try {
//     const formData = await request.formData();
//     const title = formData.get("title");
//     const description = formData.get("description");
//     const image = formData.get("image"); 

//     // Ensure the upload directory exists
//     const uploadDir = path.join(process.cwd(), "public/uploads");
//     await fs.mkdir(uploadDir, { recursive: true });

//     // Generate a unique filename for the image
//     const imageName = `${Date.now()}-${image.name}`;
//     const imagePath = path.join(uploadDir, imageName);

//     // Save the image to the server's file system
//     const imageBuffer = await image.arrayBuffer();
//     await fs.writeFile(imagePath, Buffer.from(imageBuffer));

//     // Save the post to MongoDB
//     await connectToDb();
//     const post = new PostModel({
//       title,
//       description,
//       imageUrl: `/uploads/${imageName}`, // Save relative path for access via the frontend
//     });

//     const savedPost = await post.save();
//     console.log("Post created successfully:", savedPost);

//     return NextResponse.json({
//       message: "Post created successfully",
//       data: savedPost,
//       status: 200,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Post error:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// };




// export const GET = async (request) => {
//   try {
//     await connectToDb();
//     const post = await PostModel.find();

//     return NextResponse.json({
//       message: "Post fetched successfully",
//       data: post,
//       status: 200,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };




////////////////////////////


import { PostModel } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (request) => {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");

    if (!image) {
      throw new Error("Image is required");
    }

    // Convert image file to a buffer
    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(`data:${image.type};base64,${base64Image}`, {
      folder: "posts", // Optional: Specify a folder in Cloudinary
    });

    // Save the post to MongoDB
    await connectToDb();
    const post = new PostModel({
      title,
      description,
      imageUrl: uploadResponse.secure_url, // Cloudinary URL
    });

    const savedPost = await post.save();
    console.log("Post created successfully:", savedPost);

    return NextResponse.json({
      message: "Post created successfully",
      data: savedPost,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error("Post error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async (request) => {
  try {
    await connectToDb();
    const posts = await PostModel.find();

    return NextResponse.json({
      message: "Posts fetched successfully",
      data: posts,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};
