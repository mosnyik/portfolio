// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const scrollToSection = (sectionId: string) => {
//     setIsMenuOpen(false);
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <nav className="bg-[#19485F] text-white py-4 fixed w-full z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center">
//           <Link href="/" className="text-2xl font-bold">
//             Moses Nyikwagh
//           </Link>
//           <div className="hidden md:flex space-x-4">
//             <button
//               onClick={() => scrollToSection("home")}
//               className="hover:text-[#D9E0A4] transition-colors"
//             >
//               Home
//             </button>
//             <button
//               onClick={() => scrollToSection("about")}
//               className="hover:text-[#D9E0A4] transition-colors"
//             >
//               About
//             </button>
//             <button
//               onClick={() => scrollToSection("projects")}
//               className="hover:text-[#D9E0A4] transition-colors"
//             >
//               Projects
//             </button>
//             <button
//               onClick={() => scrollToSection("contact")}
//               className="hover:text-[#D9E0A4] transition-colors"
//             >
//               Contact
//             </button>
//           </div>
//           <button
//             className="md:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>
//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             <button
//               onClick={() => scrollToSection("home")}
//               className="block hover:text-[#D9E0A4] transition-colors"
//             >
//               Home
//             </button>
//             <button
//               onClick={() => scrollToSection("about")}
//               className="block hover:text-[#D9E0A4] transition-colors"
//             >
//               About
//             </button>
//             <button
//               onClick={() => scrollToSection("projects")}
//               className="block hover:text-[#D9E0A4] transition-colors"
//             >
//               Projects
//             </button>
//             <button
//               onClick={() => scrollToSection("contact")}
//               className="block hover:text-[#D9E0A4] transition-colors"
//             >
//               Contact
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-[#19485F] text-white py-4 fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Moses Nyikwagh
          </Link>
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-[#D9E0A4] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-[#D9E0A4] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="hover:text-[#D9E0A4] transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-[#D9E0A4] transition-colors"
            >
              Contact
            </button>
            <a
              href="https://www.indepthorb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D9E0A4] transition-colors"
            >
              Blog
            </a>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection("home")}
              className="block hover:text-[#D9E0A4] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block hover:text-[#D9E0A4] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block hover:text-[#D9E0A4] transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block hover:text-[#D9E0A4] transition-colors"
            >
              Contact
            </button>
            <a
              href="https://www.indepthorb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-[#D9E0A4] transition-colors"
            >
              Blog
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
