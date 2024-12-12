"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminEdit() {
  const params = useParams();
  const UserId = params.id; // Get the ID from the URL params
  const router = useRouter();

  // State for form data
  const [inputData, setInputData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    usertype: "",
    rolename: "",
  });

  // State for admin roles
  const [AdminRole, setAdminRole] = useState([]);

  // Fetch existing user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/AdminRegister/${UserId}`);
        const res = await response.json();
        const userData = res.data

        console.log("userData=>>>",userData);
        

        if (response.ok) {
          console.log("niruuuuuuuuuuuuuuuuuuuu");
          
          setInputData({
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            usertype: userData.usertype,
            rolename: userData.rolename , 
          });
        } else {
          toast.error("Error fetching user data");
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [UserId]);

  // Fetch available admin roles
  useEffect(() => {
    const fetchUserAdminsFun = async () => {
      const fetchUserAdmins = await fetch("/api/adminrole");
      const admindata = await fetchUserAdmins.json();

      const roleNames = admindata.data.map((role) => role.rolename);
      setAdminRole(roleNames);
    };
    fetchUserAdminsFun();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/AdminRegister/${UserId}`, {
        method: "PATCH",
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
        }, 2000);
      } else {
        toast.error(result.message || "Error updating user");
      }
    } catch (error) {
      toast.error("Error updating user");
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="flex justify-center mt-10">
        <h2 className="font-semibold">Edit Admin</h2>
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
            onChange={(e) =>
              setInputData({ ...inputData, [e.target.name]: e.target.value })
            }
          />
          <input
            className="px-2 rounded-sm"
            type="text"
            placeholder="LastName"
            name="lastname"
            value={inputData.lastname}
            onChange={(e) =>
              setInputData({ ...inputData, [e.target.name]: e.target.value })
            }
          />
          <input
            className="px-2 rounded-sm"
            type="email"
            placeholder="Email"
            name="email"
            value={inputData.email}
            onChange={(e) =>
              setInputData({ ...inputData, [e.target.name]: e.target.value })
            }
          />
          <select
            name="usertype"
            onChange={(e) =>
              setInputData({ ...inputData, [e.target.name]: e.target.value })
            }
            value={inputData.usertype}
          >
            <option value="">Select User Type</option>
            <option value="1">Admin</option>
            <option value="2">SubAdmin</option>
          </select>

          <select
            name="rolename"
            onChange={(e) =>
              setInputData({ ...inputData, [e.target.name]: e.target.value })
            }
            value={inputData.rolename}
          >
            <option value="">Select Role Name</option>
            {AdminRole.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>

          <button type="submit" className="bg-blue-500 text-white">
            Update
          </button>
        </form>
      </div>

   

    </div>
  );
}
