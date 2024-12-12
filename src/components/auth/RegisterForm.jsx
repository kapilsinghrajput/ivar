"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    usertype: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          router.push("/users");
        }, [1000]);
      }

      if (!response.ok) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(result.message);
      console.log("error==", error);
    }
  };

  return (
    <div className=" bg-slate-300 rounded-lg p-2 w-full">
      <Toaster />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
        <input
          className="px-2 rounded-sm "
          type="text"
          placeholder="FirstName"
          name="firstname"
          value={inputData.firstname}
          onChange={(e) => {
            setInputData({ ...inputData, [e.target.name]: e.target.value });
          }}
        />
        <input
          className="px-2 rounded-sm "
          type="text"
          placeholder="LastName"
          name="lastname"
          value={inputData.lastname}
          onChange={(e) => {
            setInputData({ ...inputData, [e.target.name]: e.target.value });
          }}
        />
        <input
          className="px-2 rounded-sm "
          type="email"
          placeholder="email"
          name="email"
          value={inputData.email}
          onChange={(e) => {
            setInputData({ ...inputData, [e.target.name]: e.target.value });
          }}
        />
        <input
          className="px-2 rounded-sm "
          type="password"
          placeholder="password"
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
        >
          <option value="">Select User Type</option>
          <option value="1">Admin</option>
          <option value="2">SubAdmin</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white">
          Register
        </button>
        {/* <p className="mx-auto font-semibold ">Already have an account?  <Link className="text-blue-600" href={"/login"}>login</Link></p> */}
      </form>
    </div>
  );
}
