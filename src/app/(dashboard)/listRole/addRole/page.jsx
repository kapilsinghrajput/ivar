"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function addAdmin() {
  const router = useRouter();

  const [inputData, setInputData] = useState({
    rolename: "",
    roles: {
      content_edit: false,
      content_view: false,
      content_delete: false,
      content_add: false,
      users_edit: false,
      users_view: false,
      users_delete: false,
      users_add: false,
      role_edit: false,
      role_view: false,
      role_delete: false,
      role_add: false,
    },
  });

  const handleCheckboxChange = (role) => {
    setInputData((prevData) => ({
      ...prevData,
      roles: {
        ...prevData.roles,
        [role]: !prevData.roles[role],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/adminrole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setTimeout(() => {
          router.push("/listRole");
        }, 1000);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Error occurred while creating role.");
    }
  };

  return (
    <div className="w-full px-4 sm:px-8  py-8">
      <div className="flex justify-center mt-10">
        <h2 className="text-xl font-bold">Create New Role</h2>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 mx-auto w-full sm:w-[80%] mt-5 ">
        <Toaster />
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Role Name Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="rolename" className="font-semibold">
              Role Name
            </label>
            <input
              id="rolename"
              className="px-4 py-2 border rounded-md"
              type="text"
              placeholder="Enter role name"
              name="rolename"
              value={inputData.rolename}
              onChange={(e) =>
                setInputData({ ...inputData, [e.target.name]: e.target.value })
              }
            />
          </div>

          {/* Permissions */}
          <div className="flex flex-col gap-8">
            {/* Content Permissions */}
            <div className="p-4 bg-blue-100 rounded-md">
              <h4 className="font-medium mb-3">Content Permissions</h4>
              <div className="flex flex-wrap gap-4">
                {["content_edit", "content_view", "content_delete", "content_add"].map((perm) => (
                  <label key={perm} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={inputData.roles[perm]}
                      onChange={() => handleCheckboxChange(perm)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>{perm.replace("_", " ").toUpperCase()}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* User Permissions */}
            <div className="p-4 bg-green-100 rounded-md">
              <h4 className="font-medium mb-3">User Permissions</h4>
              <div className="flex flex-wrap gap-4">
                {["users_edit", "users_view", "users_delete", "users_add"].map((perm) => (
                  <label key={perm} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={inputData.roles[perm]}
                      onChange={() => handleCheckboxChange(perm)}
                      className="form-checkbox h-5 w-5 text-green-600"
                    />
                    <span>{perm.replace("_", " ").toUpperCase()}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Role Permissions */}
            <div className="p-4 bg-red-100 rounded-md">
              <h4 className="font-medium mb-3">Role Permissions</h4>
              <div className="flex flex-wrap gap-4">
                {["role_edit", "role_view", "role_delete", "role_add"].map((perm) => (
                  <label key={perm} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={inputData.roles[perm]}
                      onChange={() => handleCheckboxChange(perm)}
                      className="form-checkbox h-5 w-5 text-red-600"
                    />
                    <span>{perm.replace("_", " ").toUpperCase()}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Create Role
          </button>
        </form>
      </div>
    </div>
  );
}
