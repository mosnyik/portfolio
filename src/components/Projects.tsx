"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import MobileScreenshots from "../components/MobileScreenshots";
import WebScreenshots from "../components/WebScreenshots";
import { Project } from "@/types/projectsTypes";
import { getProjectsFromFirebase } from "@/firebaseOps";
import ProjectSkeleton from "./ProjectSkeleton";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const fetchedProjects = await getProjectsFromFirebase();
        const updatedProjects = fetchedProjects.map((project) => ({
          ...project,
          image: project.image.includes("?")
            ? project.image
            : `${project.image}?height=300&width=400`,
          webScreenshots:
            project.webScreenshots?.map((url) =>
              url.includes("?")
                ? `${url}&height=600&width=800`
                : `${url}?height=600&width=800`
            ) ?? [],
          mobileScreenshots:
            project.mobileScreenshots?.map((url) =>
              url.includes("?")
                ? `${url}&height=600&width=300`
                : `${url}?height=600&width=300`
            ) ?? [],
        }));
        setProjects(updatedProjects);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center text-[#19485F]"
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 gap-16">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <ProjectSkeleton key={index} />
              ))
            : projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-[#D9E0A4] rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="md:flex">
                    <div className="md:w-1/2 p-1 rounded">
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={400}
                        height={300}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-1/2">
                      <h3 className="text-2xl font-bold mb-2 text-[#19485F]">
                        {project.name}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {project.description}
                      </p>
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2 text-[#19485F]">
                          Tech Stack:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="bg-[#19485F] text-white py-1 px-2 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#19485F] text-white py-2 px-4 rounded-full inline-block hover:bg-opacity-80 transition-colors"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                  {project.webScreenshots &&
                    project.webScreenshots.length > 0 && (
                      <div className="mt-4">
                        <WebScreenshots screenshots={project.webScreenshots} />
                      </div>
                    )}
                  {project.mobileScreenshots &&
                    project.mobileScreenshots.length > 0 && (
                      <div className="mt-4">
                        <MobileScreenshots
                          screenshots={project.mobileScreenshots}
                        />
                      </div>
                    )}
                </motion.div>
              ))}
        </div>
        {error && <div className="text-center py-20 text-red-500">{error}</div>}
      </div>
    </section>
  );
}
