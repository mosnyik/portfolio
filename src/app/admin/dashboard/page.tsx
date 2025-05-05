"use client";

import ImageUploader from "@/components/ImageUploader";
import ProjectForm from "@/components/ProjectForm";
import SkillForm from "@/components/SkillForm";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      if (!user) {
        console.log("From dashboard page, user is not logged In", user);
        // User is signed out, redirect to login
        router.push("/login");
      }
    });

    // Set a timeout to prevent indefinite loading
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds timeout

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#19485F]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex mb-6">
        <button
          className={`mr-4 px-4 py-2 rounded-md ${
            activeTab === "projects"
              ? "bg-[#19485F] text-white"
              : "bg-gray-200 text-[#19485F]"
          }`}
          onClick={() => setActiveTab("projects")}
        >
          Manage Projects
        </button>
        <button
          className={`mr-4 px-4 py-2 rounded-md ${
            activeTab === "skills"
              ? "bg-[#19485F] text-white"
              : "bg-gray-200 text-[#19485F]"
          }`}
          onClick={() => setActiveTab("skills")}
        >
          Manage Skills
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "images"
              ? "bg-[#19485F] text-white"
              : "bg-gray-200 text-[#19485F]"
          }`}
          onClick={() => setActiveTab("images")}
        >
          Upload Images
        </button>
      </div>
      {activeTab === "projects" && <ProjectForm />}
      {activeTab === "skills" && <SkillForm />}
      {activeTab === "images" && <ImageUploader />}
    </div>
  );
}
