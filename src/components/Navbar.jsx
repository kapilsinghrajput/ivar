"use client";

import toast, { Toaster } from "react-hot-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { redirect } from "next/navigation";

function Navbar() {
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "GET",
      credentials: "include",
    });

    toast.success("Logout Successfull");

    setTimeout(() => {
      redirect("/auth");
    }, 2000);
  };

  const { userData , isMobileView} = useUser();

   return (
    <div
      className={`h-10 sticky top-0 z-50 flex justify-between ${
        isMobileView ? "bg-orange-300" : "bg-orange-400"
      }`}
    >
      <Toaster />
      <div className="mx-2">Home</div>
      <div className="mx-14 my-auto outline-none focus:ring-0 focus:outline-none">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-slate-100 rounded-sm p-1 my-auto">
            Profile
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{`${userData.firstname} ${userData.lastname}`}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/adminProfile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={handleLogout}>Log Out</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Navbar;