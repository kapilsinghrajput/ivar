"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function page() {
  const router = useRouter();
  const params = useParams();
  const PostId = params.id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null, // Changed to handle image file
  });

  // Fetch existing post data
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/ContentManage/${PostId}`);
        const res = await response.json();
        const PostData = res.data;

        if (response.ok) {
          setFormData({
            title: PostData.title,
            description: PostData.description,
            image: null, // Existing image file not fetched
          });
        } else {
          toast.error("Error fetching post data");
        }
      } catch (error) {
        console.log("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [PostId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] }); // Update file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const response = await fetch(`/api/ContentManage/${PostId}`, {
        method: "PATCH",
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setTimeout(() => {
          router.push("/content_manage");
        }, 1000);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Error occurred while updating the post.");
      console.log("error==", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Update Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter description"
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block font-medium mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}
