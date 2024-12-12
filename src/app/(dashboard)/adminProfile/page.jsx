"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const { userData } = useUser();

  const [formdata, setFormdata] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldpassword, newpassword, confirmpassword } = formdata;

    // Validate inputs
    if (!oldpassword || !newpassword || !confirmpassword) {
      toast.error("All fields are required!");
      return;
    }

    if (newpassword !== confirmpassword) {
      toast.error("New Password and Confirm Password do not match!");
      return;
    }

    const payload = { oldpassword, newpassword };

    try {
      const response = await fetch(`/api/AdminRegister/edit/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      toast.success(data.message || "Password changed successfully!");

      setFormdata({
        oldpassword: "",
        newpassword: "",
        confirmpassword: "",
      });
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-center mt-20">
        <h2 className="text-4xl font-bold">
          Welcome to{" "}
          <span className="text-blue-400">
            {`${userData.firstname} ${userData.lastname}`}
          </span>
        </h2>
      </div>

      {userData.usertype == 1 || userData.usertype == 2 ?( <div className="w-[80%] mx-auto mt-10">
        <h2 className="text-center font-semibold text-2xl mb-2">
          Change Password
        </h2>
        <div className="bg-slate-300 p-5 rounded-md">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center"
          >
            <input
              type="password"
              name="oldpassword"
              placeholder="Old Password"
              value={formdata.oldpassword}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-sm w-[95%]"
              required
            />
            <input
              type="password"
              name="newpassword"
              placeholder="New Password"
              value={formdata.newpassword}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-sm w-[95%]"
              required
            />
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              value={formdata.confirmpassword}
              onChange={handleInputChange}
              className="px-4 py-2 rounded-sm w-[95%]"
              required
            />
            <button
              type="submit"
              className="bg-blue-400 text-white px-5 py-2 rounded-md font-bold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>):""}
    </div>
  );
}
