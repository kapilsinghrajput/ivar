"use client";

import { Home, Users, List, Layers, PanelLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

// Menu items
const items = [
  { title: "Home", url: "/admin", icon: Home },
  { title: "User Management", url: "/usersManagement", icon: Users },
  { title: "List Role", url: "/listRole", icon: List },
  { title: "Content Management", url: "/content_manage", icon: Layers },
];

export function AppSidebar() {

  const pathname = usePathname();
  const { isMobileView, setIsMobileView , isSidebarOpen, setIsSidebarOpen } = useUser();


  // Check if screen size is below 600px
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 600);
      // If in mobile view, close the sidebar
      if (window.innerWidth < 600) {
        setIsSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className=" ">
      {/* Sidebar */}
      <div
        className={`transition-transform duration-300 ease-in-out  ${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-slate-50 text-gray-800 h-screen overflow-hidden`}
      >
        {/* Sidebar content */}
        <div className="flex flex-col p-5 h-full  fixed">
          <div className="flex items-center justify-between mb-5">
            {!isMobileView && (
              <Image
                src="https://pinblooms.com/wp-content/uploads/2021/01/pinblooms-final.svg"
                width={150}
                height={150}
                alt="img"
                className={`${!isSidebarOpen ? "hidden" : ""}`}
              />
            )}
            <button onClick={toggleSidebar} className="text-gray-800  mx-auto">
              <PanelLeft
                className={`w-5  ${isSidebarOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          <div className="mt-5">
            <ul>
              {items.map((item) => (
                <li key={item.title} className="mb-4">
                  <Link
                    href={item.url}
                    passHref
                    className={`flex items-center p-2 rounded-md ${
                      pathname === item.url
                        ? "bg-blue-500 text-white"
                        : "text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    <item.icon
                      className={`mr-2 ${
                        pathname === item.url ? "text-white" : "text-gray-800"
                      }`}
                    />
                    {/* Only show item title when sidebar is open */}
                    {isSidebarOpen && <span>{item.title}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>  
    </div>
  );
}
