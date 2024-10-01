// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { addSkill } from "@/app/actions";

// export default function SkillForm() {
//   const [skill, setSkill] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("skill", skill);
//     const result = await addSkill(formData);
//     if (result.success) {
//       setSkill("");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label
//           htmlFor="skill"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Skill Name
//         </label>
//         <input
//           type="text"
//           id="skill"
//           value={skill}
//           onChange={(e) => setSkill(e.target.value)}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#19485F] focus:ring-[#19485F]"
//           required
//         />
//       </div>
//       <motion.button
//         type="submit"
//         className="w-full bg-[#19485F] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
//         whileTap={{ scale: 0.95 }}
//       >
//         Add Skill
//       </motion.button>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { addSkill } from "@/app/actions";

export default function SkillForm() {
  const [skill, setSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("skill", skill);
    const result = await addSkill(formData);
    if (result.success) {
      setSkill("");
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
          Add New Skill
        </h2>
        <div>
          <label
            htmlFor="skill"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Skill Name
          </label>
          <input
            type="text"
            id="skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
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
              Adding Skill...
            </>
          ) : (
            "Add Skill"
          )}
        </motion.button>
      </form>
    </div>
  );
}
