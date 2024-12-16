"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";



export default function ListRole() {
  const { userData, Roles } = useUser();
  const [datalist, setdatalist] = useState([]);

  useEffect(() => {

    const fetchUserAdminsFun = async () => {
      const fetchUserAdmins = await fetch(
        `/api/adminrole`,
        {
          method: "GET",
        }
      );

      const admindata = await fetchUserAdmins.json();
      setdatalist(admindata.data);
    };
    fetchUserAdminsFun();
  }, []);

  async function deleteRole(RoleId) {
    const response = await fetch(`/api/adminrole/${RoleId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setdatalist((prevData) => prevData.filter((Role) => Role._id !== RoleId));
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  }

  return (
    <div className="w-full">
      {userData?.role_id && Roles.includes("role_add") ? (
        <div className="flex flex-col justify-center items-center mb-10">
          <h1>Create New Role</h1>
          <Link
            href={"listRole/addRole"}
            className="bg-blue-500 mt-2 text-white rounded-md px-2 py-1"
          >
            Add Role
          </Link>
        </div>
      ) : (
        ""
      )}

<div className="w-[98%] mx-auto my-4 ">
  <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_3fr_auto] gap-4 my-2 px-2">
    <div className="font-bold">No.</div>
    <div className="font-bold">Role Name</div>
    <div className="font-bold">Permission Type</div>
    {userData && userData.usertype === 0 && (
      <div className="font-bold text-right">Action</div>
    )}
  </div>

  {datalist.map((e, i) => (
    <div
      key={i}
      className="grid grid-cols-1 md:grid-cols-[1fr_2fr_3fr_auto] gap-4 items-center border-b px-2 py-2 hover:bg-gray-100"
    >
      <div>{i + 1}</div>
      <div>{e.rolename}</div>
      <div>
        {e.roles.map((role, j) => (
          <span
            key={j}
            className="bg-blue-400 text-white rounded-md px-2 py-1 text-xs mr-2 mb-1 inline-block"
          >
            {role}
          </span>
        ))}
      </div>

      <div className="flex justify-end space-x-2">
        {userData?.role_id && Roles.includes("role_edit") && (
          <button className="bg-teal-500 px-2 rounded-sm text-white">
            <Link href={`/listRole/edit/${e._id}`}>Edit</Link>
          </button>
        )}

        {userData?.role_id && Roles.includes("role_delete") && (
          <button
            onClick={() => deleteRole(e._id)}
            className="bg-red-500 px-2 rounded-sm text-white"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
