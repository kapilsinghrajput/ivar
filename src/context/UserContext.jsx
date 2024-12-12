"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

// access data from this function
export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children, user, roles }) {
  const [userData, setUserData] = useState(user);
  const [Roles, setRoles] = useState(roles);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        Roles,
        setRoles,
        isMobileView,
        setIsMobileView,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
