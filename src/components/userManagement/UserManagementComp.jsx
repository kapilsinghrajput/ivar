"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast, { Toaster } from "react-hot-toast";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useState } from "react";

const UserManagementComp = ({ datalist }) => {
  const { Roles, userData } = useUser();

  const [DataList, setDataList] = useState(datalist); // Set initial data from props

  async function deleteUser(userId) {
    const response = await fetch(`/api/AdminRegister/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setDataList((prevData) => prevData.filter((user) => user._id !== userId)); // Remove the deleted user
      // alert('User deleted successfully!');
      // toast.success('User deleted successfully!');
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  }

  const formatdate = (datedata) => {
    const date = new Date(datedata);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };

  const userRoleType = (value) => {
    if (value == 0) {
      return "SuperAdmin";
    }
    if (value == 1) {
      return "Admin";
    }
    if (value == 2) {
      return "SubAdmin";
    }
  };

  return (
    <div className="w-full ">
      <Toaster />

      {userData?.role_id && Roles.includes("users_add") ? (
        <div className="flex flex-col justify-center items-center">
          <h1>Create New User</h1>
          <Link
            href={"usersManagement/addAdmin"}
            className="bg-blue-500 mt-2 text-white rounded-md px-2 py-1 "
          >
            Add Admin
          </Link>
        </div>
      ) : (
        ""
      )}

      <div className="w-[95%] mx-auto my-4  h-10">
        <Table>
          {/* <TableCaption>A list of your Admin Users.</TableCaption> */}
          <TableHeader className="pb-4">
            <TableRow>
              <TableHead className="w-[20px]">No.</TableHead>
              <TableHead>
                <b>Name</b>
              </TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Creation date</TableHead>
              <TableHead className="">User Type</TableHead>
              <TableHead className="">User Role</TableHead>
              {(userData?.role_id && Roles.includes("users_delete")) ||
              Roles.includes("users_edit") ? (
                <TableHead className="text-center">Action</TableHead>
              ) : (
                ""
              )}
            </TableRow>
          </TableHeader>

          {DataList.map((e, i) => {
            return (
              <TableBody key={i}>
                <TableRow>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>{`${e.firstname} ${e.lastname}`}</TableCell>
                  <TableCell>{e.email}</TableCell>
                  <TableCell>{formatdate(e.createdAt)}</TableCell>
                  <TableCell>{userRoleType(e.usertype)}</TableCell>
                  <TableCell>{e.rolename}</TableCell>

                  <TableCell className=" flex justify-around ">
                    {userData?.role_id && Roles.includes("users_edit") ? (
                      <button className="bg-teal-500 px-2 rounded-sm">
                        <Link href={`/usersManagement/edit/${e._id}`}>
                          {" "}
                          Edit
                        </Link>
                      </button>
                    ) : (
                      ""
                    )}

                    {userData?.role_id && Roles.includes("users_delete") ? (
                      <button
                        className="bg-teal-500 px-2 rounded-sm"
                        onClick={() => {
                          deleteUser(e._id);
                        }}
                      >
                        Delete
                      </button>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
      </div>
    </div>
  );
};

export default UserManagementComp;
