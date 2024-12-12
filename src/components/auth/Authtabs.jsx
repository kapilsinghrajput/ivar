import React from "react";
import LogingForm from "./LogingForm";

export default function Authtabs() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[500px] bg-slate-300 p-3 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <LogingForm />
      </div>
    </div>
  );
}
