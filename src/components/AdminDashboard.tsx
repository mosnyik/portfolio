"use client";

import { useState } from "react";
import ProjectForm from "./ProjectForm";
import SkillForm from "./SkillForm";
import ImageUploader from "./ImageUploader";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects");

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
