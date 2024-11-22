"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { addProject } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function ProjectForm() {
  const router = useRouter();
  const [project, setProject] = useState({
    name: "",
    description: "",
    image: "",
    link: "",
    techStack: "",
    webScreenshots: "",
    mobileScreenshots: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    Object.entries(project).forEach(([key, value]) => {
      if (key === "techStack") {
        formData.append(
          key,
          JSON.stringify(value.split(",").map((tech) => tech.trim()))
        );
      } else if (key === "webScreenshots" || key === "mobileScreenshots") {
        formData.append(
          key,
          JSON.stringify(value.split("\n").map((url) => url.trim()))
        );
      } else {
        formData.append(key, value);
      }
    });

    try {
      const result = await addProject(formData);
      if (result.success) {
        setProject({
          name: "",
          description: "",
          image: "",
          link: "",
          techStack: "",
          webScreenshots: "",
          mobileScreenshots: "",
        });
        router.refresh(); // Refresh the current route
      } else {
        setError(result.message || "Failed to add project");
      }
    } catch (err) {
      setError(`An unexpected error occurred: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-[#19485F] mb-6">
          Add New Project
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Name
          </label>
          <input
            type="text"
            id="name"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            className="block w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
            className="block w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
            rows={3}
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL
          </label>
          <input
            type="url"
            id="image"
            value={project.image}
            onChange={(e) => setProject({ ...project, image: e.target.value })}
            className="block w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
            required
          />
        </div>
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Link
          </label>
          <input
            type="url"
            id="link"
            value={project.link}
            onChange={(e) => setProject({ ...project, link: e.target.value })}
            className="block w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
            required
          />
        </div>
        <div>
          <label
            htmlFor="techStack"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tech Stack (comma-separated)
          </label>
          <input
            type="text"
            id="techStack"
            value={project.techStack}
            onChange={(e) =>
              setProject({ ...project, techStack: e.target.value })
            }
            className="block w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
            required
          />
        </div>
        <div>
          <label
            htmlFor="webScreenshots"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Web Screenshots (one URL per line)
          </label>
          <textarea
            id="webScreenshots"
            value={project.webScreenshots}
            onChange={(e) =>
              setProject({ ...project, webScreenshots: e.target.value })
            }
            className="block w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
            rows={3}
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="mobileScreenshots"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mobile Screenshots (one URL per line)
          </label>
          <textarea
            id="mobileScreenshots"
            value={project.mobileScreenshots}
            onChange={(e) =>
              setProject({ ...project, mobileScreenshots: e.target.value })
            }
            className="block w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
            rows={3}
          ></textarea>
        </div>
        <motion.button
          type="submit"
          className="w-full bg-[#19485F] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin-slow -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Add Project"
          )}
        </motion.button>
      </form>
    </div>
  );
}
