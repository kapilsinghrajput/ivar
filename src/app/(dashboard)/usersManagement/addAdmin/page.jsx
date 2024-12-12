"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function addAdmin() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    usertype: "",
    rolename: "",
  });

  const [AdminRole, setAdminRole] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    for (const key in inputData) {
      if (!inputData[key]) {
        toast.error(`${key} is required`);
        return;
      }
    }

    try {
      const response = await fetch("/api/AdminRegister", {
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
          router.push("/usersManagement");
        }, 1000);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchUserAdminsFun = async () => {
      try {
        const fetchUserAdmins = await fetch(
          "/api/adminrole",
          {
            method: "GET",
          }
        );

        const admindata = await fetchUserAdmins.json();

        const roleNames = admindata.data.map((role) => role.rolename);
        console.log("All Role Names:", roleNames);
        setAdminRole(roleNames);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchUserAdminsFun();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-center mt-10">
        <h2>Create new Admin</h2>
      </div>

      <div className="bg-slate-300 rounded-lg p-2 mx-auto w-[80%] mt-5">
        <Toaster />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 text-black"
        >
          <input
            className="px-2 rounded-sm"
            type="text"
            placeholder="FirstName"
            name="firstname"
            value={inputData.firstname}
            onChange={(e) => {
              setInputData({ ...inputData, [e.target.name]: e.target.value });
            }}
          />
          <input
            className="px-2 rounded-sm"
            type="text"
            placeholder="LastName"
            name="lastname"
            value={inputData.lastname}
            onChange={(e) => {
              setInputData({ ...inputData, [e.target.name]: e.target.value });
            }}
          />
          <input
            className="px-2 rounded-sm"
            type="email"
            placeholder="Email"
            name="email"
            value={inputData.email}
            onChange={(e) => {
              setInputData({ ...inputData, [e.target.name]: e.target.value });
            }}
          />
          <input
            className="px-2 rounded-sm"
            type="password"
            placeholder="Password"
            name="password"
            value={inputData.password}
            onChange={(e) => {
              setInputData({ ...inputData, [e.target.name]: e.target.value });
            }}
          />
          <select
            name="usertype"
            onChange={(e) => {
              setInputData({ ...inputData, [e.target.name]: e.target.value });
            }}
            value={inputData.usertype}
            required={true}
          >
            <option value="">Select User Type</option>
            <option value="1">Admin</option>
            <option value="2">SubAdmin</option>
          </select>

          <select
            name="rolename"
            onChange={(e) => {
              setInputData({ ...inputData, [e.target.name]: e.target.value });
            }}
            value={inputData.rolename}
            required={true}
          >
            <option value="">Select Role Name</option>
            {AdminRole.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>

          <button type="submit" className="bg-blue-500 text-white">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
