// "use client";

// import { Moon, Sun, Monitor } from "lucide-react";
// import { useTheme } from "./theme-provider";
// import { useState } from "react";

// export function ThemeToggle() {
//   const { theme, setTheme } = useTheme();
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => setIsOpen(!isOpen);
//   const closeDropdown = () => setIsOpen(false);

//   const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
//     setTheme(newTheme);
//     closeDropdown();
//   };

//   return (
//     <div className="relative">
//       <button
//         onClick={toggleDropdown}
//         className="flex items-center hover:text-[#19485F]/70 transition-colors"
//         aria-label="Toggle theme"
//       >
//         {theme === "light" && <Sun size={20} />}
//         {theme === "dark" && <Moon size={20} />}
//         {theme === "system" && <Monitor size={20} />}
//         <span className="ml-2 text-sm">Theme</span>
//       </button>

//       {isOpen && (
//         <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-[#19485F] shadow-md rounded-md overflow-hidden z-50">
//           <div className="p-1">
//             <button
//               onClick={() => handleThemeChange("light")}
//               className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-[#19485F]/70"
//             >
//               <Sun size={16} className="mr-2" />
//               Light
//             </button>
//             <button
//               onClick={() => handleThemeChange("dark")}
//               className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-[#19485F]/70"
//             >
//               <Moon size={16} className="mr-2" />
//               Dark
//             </button>
//             <button
//               onClick={() => handleThemeChange("system")}
//               className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-[#19485F]/70"
//             >
//               <Monitor size={16} className="mr-2" />
//               System
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    closeDropdown();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center hover:text-[#19485F]/70 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "light" && <Sun size={20} />}
        {theme === "dark" && <Moon size={20} />}
        {theme === "system" && <Monitor size={20} />}
        <span className="ml-2 text-sm">Theme</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-[#1e293b] shadow-md rounded-md overflow-hidden z-50">
          <div className="p-1">
            <button
              onClick={() => handleThemeChange("light")}
              className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-[#334155] dark:text-gray-200"
            >
              <Sun size={16} className="mr-2" />
              Light
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-[#334155] dark:text-gray-200"
            >
              <Moon size={16} className="mr-2" />
              Dark
            </button>
            <button
              onClick={() => handleThemeChange("system")}
              className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-[#334155] dark:text-gray-200"
            >
              <Monitor size={16} className="mr-2" />
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
