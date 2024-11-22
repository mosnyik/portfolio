"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, Linkedin, Mail, Twitter, Settings } from "lucide-react";

export default function Footer() {
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();

  const handleAdminClick = () => {
    router.push("/admin");
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#D9E0A4] text-[#19485F] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">Moses Nyikwagh</h3>
            <div className="flex items-center">
              <p className="text-sm mr-2">Software Engineer</p>
              <div className="relative">
                <button
                  onClick={handleAdminClick}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="hover:text-[#19485F]/70 transition-colors focus:outline-none"
                  aria-label="Admin Dashboard"
                >
                  <Settings size={12} />
                </button>
                {showTooltip && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-[#19485F] text-white text-xs rounded whitespace-nowrap">
                    Admin Only
                  </div>
                )}
              </div>
            </div>
          </div>
          <nav className="flex space-x-4 mb-4 md:mb-0">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-[#19485F]/70 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-[#19485F]/70 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="hover:text-[#19485F]/70 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-[#19485F]/70 transition-colors"
            >
              Contact
            </button>
            <a
              href="https://www.indepthorb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#19485F]/70 transition-colors"
            >
              Blog
            </a>
          </nav>
          <div className="flex space-x-4">
            <a
              href="https://github.com/mosnyik"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#19485F]/70 transition-colors"
            >
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/moses-nyikwagh-a29a25127/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#19485F]/70 transition-colors"
            >
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://x.com/mosnyik"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#19485F]/70 transition-colors"
            >
              <Twitter size={24} />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="mailto:mosnyik@gmail.com"
              className="hover:text-[#19485F]/70 transition-colors"
            >
              <Mail size={24} />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Moses Nyikwagh. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
