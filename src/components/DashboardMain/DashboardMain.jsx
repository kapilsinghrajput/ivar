"use client"

import React from 'react'
import Navbar from '../Navbar'
import { useUser } from '@/context/UserContext';

export default function DashboardMain({children}) {
    const {isSidebarOpen} = useUser();

  return (
    <div className={`flex ${isSidebarOpen?"ml-64":"ml-20"} w-full `}>
    <div className=" w-full ">
    <Navbar />
    <main className=" block  ">
      {children}
    </main>
    </div>
  </div>
  )
}
