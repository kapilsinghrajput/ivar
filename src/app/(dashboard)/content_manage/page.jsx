"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

export default function Page() {
  const [users, setUsers] = useState([]);
  const { Roles, userData } = useUser();

  // Fetch data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/ContentManage`);
        const res = await response.json();
        setUsers(res.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete action
  const deleteHandle = async (postId) => {
    try {
      const response = await fetch(`/api/ContentManage/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success(" Post deleted successfully!");
        setUsers(users.filter((user) => user._id !== postId));
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      toast.error("Error deleting user.");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="flex justify-center mx-auto my-4">
        {userData?.role_id && Roles.includes("content_add") ? (
          <button className="bg-blue-400 px-2 rounded-md text-2xl text-white">
            <Link href="/content_manage/AddPost">Add post</Link>
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="border  p-4 rounded shadow hover:shadow-lg transition-shadow duration-300 block"
          >
            <Link href={`/content_manage/${user._id}`}>
              <div>
                <Image
                  width={500}
                  height={500}
                  src={user.imageUrl}
                  alt={user.title}
                  className="w-full h-32 object-cover  mb-4"
                />
                <h2 className="text-lg font-semibold truncate">{user.title}</h2>
                <p className="text-gray-600 truncate">{user.description}</p>
              </div>
            </Link>
            <div className="mt-4 flex justify-between">
              {/* Edit Button */}

              {userData?.role_id && Roles.includes("content_edit") ? (
                <Link href={`/content_manage/edit/${user._id}`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Edit
                  </button>
                </Link>
              ) : (
                ""
              )}

              {/* Delete Button */}

              {userData?.role_id && Roles.includes("content_delete") ? (
                <button
                  onClick={() => deleteHandle(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
