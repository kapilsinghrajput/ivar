import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="w-full flex ">
      <div className="relative flex items-center justify-center min-h-screen bg-green-400 ">
        {/* Background Image */}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90"></div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-md mx-auto p-6   rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-gray-300 mb-6">
            Manage your projects efficiently and effectively. Please log in to
            continue.
          </p>
          <Link
            href="/auth"
            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition-all"
          >
            Log in
          </Link>
        </div>
      </div>

      <div className="  w-full">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 "
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148879890.jpg?t=st=1732712257~exp=1732715857~hmac=2d212d8a935d583e4d3be5dbdd65bfdcff7bddfa54d9c541dcb341c13aa2bcdb&w=826')",
          }}
        >
          <h2 className='text-center mt-5 text-white  text-3xl font-bold z-["900"] '>
            Welcome Our Admin Dashboard
          </h2> 
        
        </div>
      </div>
    </div>
  );
}
