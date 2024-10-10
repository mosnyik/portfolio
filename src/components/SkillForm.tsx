// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { addSkills } from "@/app/actions";

// export default function SkillForm() {
//   const [skills, setSkills] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     const formData = new FormData();
//     formData.append("skills", skills);
//     try {
//       const result = await addSkills(formData);
//       if (result.success) {
//         setSkills("");
//       } else {
//         setError(result.message || "Failed to add skills");
//       }
//     } catch (err) {
//       console.error("Error adding skills:", err);
//       setError("An unexpected error occurred. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-6 w-full max-w-md p-8 bg-white rounded-lg shadow-md"
//       >
//         <h2 className="text-2xl font-bold text-center text-[#19485F] mb-6">
//           Add New Skills
//         </h2>
//         {error && <div className="text-red-500 text-center mb-4">{error}</div>}
//         <div>
//           <label
//             htmlFor="skills"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Skills (comma-separated)
//           </label>
//           <input
//             type="text"
//             id="skills"
//             value={skills}
//             onChange={(e) => setSkills(e.target.value)}
//             className="block w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
//             required
//             placeholder="e.g. JavaScript, React, Node.js"
//           />
//         </div>
//         <motion.button
//           type="submit"
//           className="w-full bg-[#19485F] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center"
//           whileTap={{ scale: 0.95 }}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <>
//               <svg
//                 className="animate-spin-slow -ml-1 mr-3 h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Adding Skills...
//             </>
//           ) : (
//             "Add Skills"
//           )}
//         </motion.button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { addSkills, getSkills, updateSkill, deleteSkill } from "@/app/actions";
import { Skill } from "@/types/skillTypes";


export default function SkillForm() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkills, setNewSkills] = useState("");
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const fetchedSkills = await getSkills();
    setSkills(fetchedSkills);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const formData = new FormData();
    formData.append("skills", newSkills);
    try {
      const result = await addSkills(formData);
      if (result.success) {
        setNewSkills("");
        await fetchSkills();
      } else {
        setError(result.message || "Failed to add skills");
      }
    } catch (err) {
      console.error("Error adding skills:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (skill: Skill) => {
    setEditingSkill(skill);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    setIsSubmitting(true);
    setError(null);
    const formData = new FormData();
    formData.append("id", editingSkill.id);
    formData.append("newName", editingSkill.name);
    try {
      const result = await updateSkill(formData);
      if (result.success) {
        setEditingSkill(null);
        await fetchSkills();
      } else {
        setError(result.message || "Failed to update skill");
      }
    } catch (err) {
      console.error("Error updating skill:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsSubmitting(true);
    setError(null);
    const formData = new FormData();
    formData.append("id", id);
    try {
      const result = await deleteSkill(formData);
      if (result.success) {
        await fetchSkills();
      } else {
        setError(result.message || "Failed to delete skill");
      }
    } catch (err) {
      console.error("Error deleting skill:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="space-y-6 w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#19485F] mb-6">
          Manage Skills
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Add New Skills (comma-separated)
            </label>
            <input
              type="text"
              id="skills"
              value={newSkills}
              onChange={(e) => setNewSkills(e.target.value)}
              className="block w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
              required
              placeholder="e.g. JavaScript, React, Node.js"
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-[#19485F] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Skills..." : "Add Skills"}
          </motion.button>
        </form>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Existing Skills</h3>
          <ul className="space-y-2">
            {skills.map((skill) => (
              <li key={skill.id} className="flex items-center justify-between">
                {editingSkill && editingSkill.id === skill.id ? (
                  <form onSubmit={handleUpdate} className="flex-1 mr-2">
                    <input
                      type="text"
                      value={editingSkill.name}
                      onChange={(e) =>
                        setEditingSkill({
                          ...editingSkill,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-2 py-1 border-b-2 border-gray-300 focus:outline-none focus:border-[#19485F]"
                    />
                  </form>
                ) : (
                  <span>{skill.name}</span>
                )}
                <div>
                  {editingSkill && editingSkill.id === skill.id ? (
                    <button
                      onClick={handleUpdate}
                      className="text-green-600 hover:text-green-800 mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(skill)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
