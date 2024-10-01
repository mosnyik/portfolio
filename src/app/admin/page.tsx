"use client";

import { useState } from "react";
import AdminDashboard from "../../components/AdminDashboard";
import Login from "@/components/Login";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#19485F]">
        Admin Dashboard
      </h1>
      {isLoggedIn ? (
        <AdminDashboard />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}
