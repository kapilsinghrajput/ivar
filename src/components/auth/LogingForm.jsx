"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LogingForm() {
  const router = useRouter();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/SuperAdminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const result = await response.json();

      if (response.ok) {
        // localStorage.setItem("loginusertype",JSON.stringify(result.data) );
        toast.success(result.message);
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      }
      if (!response.ok) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className=" bg-slate-300 rounded-lg p-2">
      <Toaster />
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 text-black "
      >
        <input
          className="px-2 rounded-sm "
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => {
            setformdata({ ...formdata, [e.target.name]: e.target.value });
          }}
        />
        <input
          className="px-2 rounded-sm "
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => {
            setformdata({ ...formdata, [e.target.name]: e.target.value });
          }}
        />
        <button type="submit" className="bg-blue-500 text-white rounded-sm ">
          login
        </button>
      </form>
    </div>
  );
}
