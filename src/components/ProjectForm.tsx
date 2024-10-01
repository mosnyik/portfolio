// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { addProject } from "@/app/actions";

// export default function ProjectForm() {
//   const [project, setProject] = useState({
//     name: "",
//     description: "",
//     image: "",
//     link: "",
//     techStack: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(project).forEach(([key, value]) => {
//       formData.append(key, value);
//     });
//     const result = await addProject(formData);
//     if (result.success) {
//       // Reset form or show success message
//       setProject({
//         name: "",
//         description: "",
//         image: "",
//         link: "",
//         techStack: "",
//       });
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label
//           htmlFor="name"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Project Name
//         </label>
//         <input
//           type="text"
//           id="name"
//           value={project.name}
//           onChange={(e) => setProject({ ...project, name: e.target.value })}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#19485F] focus:ring-[#19485F]"
//           required
//         />
//       </div>
//       <div>
//         <label
//           htmlFor="description"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Description
//         </label>
//         <textarea
//           id="description"
//           value={project.description}
//           onChange={(e) =>
//             setProject({ ...project, description: e.target.value })
//           }
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#19485F] focus:ring-[#19485F]"
//           rows={3}
//           required
//         ></textarea>
//       </div>
//       <div>
//         <label
//           htmlFor="image"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Image URL
//         </label>
//         <input
//           type="url"
//           id="image"
//           value={project.image}
//           onChange={(e) => setProject({ ...project, image: e.target.value })}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#19485F] focus:ring-[#19485F]"
//           required
//         />
//       </div>
//       <div>
//         <label
//           htmlFor="link"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Project Link
//         </label>
//         <input
//           type="url"
//           id="link"
//           value={project.link}
//           onChange={(e) => setProject({ ...project, link: e.target.value })}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#19485F] focus:ring-[#19485F]"
//           required
//         />
//       </div>
//       <div>
//         <label
//           htmlFor="techStack"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Tech Stack (comma-separated)
//         </label>
//         <input
//           type="text"
//           id="techStack"
//           value={project.techStack}
//           onChange={(e) =>
//             setProject({ ...project, techStack: e.target.value })
//           }
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#19485F] focus:ring-[#19485F]"
//           required
//         />
//       </div>
//       <motion.button
//         type="submit"
//         className="w-full bg-[#19485F] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
//         whileTap={{ scale: 0.95 }}
//       >
//         Add Project
//       </motion.button>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { addProject } from "@/app/actions";

export default function ProjectForm() {
  const [project, setProject] = useState({
    name: "",
    description: "",
    image: "",
    link: "",
    techStack: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(project).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const result = await addProject(formData);
    if (result.success) {
      setProject({
        name: "",
        description: "",
        image: "",
        link: "",
        techStack: "",
      });
    }
    setIsSubmitting(false);
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
