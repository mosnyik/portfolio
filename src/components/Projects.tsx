// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import MobileScreenshots from "../components/MobileScreenshots";
// import WebScreenshots from "../components/WebScreenshots";
// import { Project } from "@/types/projectsTypes";

// const projects: Project[] = [
//   {
//     name: "2Settle",
//     description: "A web application for crypto to fiat financial settlements",
//     image:
//       "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/2settle-home-97SNaLHJxGz2WafkMLgP47FIodlChB.jpeg?height=300&width=400",
//     link: "https://spend.2settle.io",
//     techStack: ["Next.js", "TypeScript", "Solidity", "Node.js"],
//     webScreenshots: [
// "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/2settle-home-97SNaLHJxGz2WafkMLgP47FIodlChB.jpeg?height=600&width=800",
//   "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/2settle-trasact-7tq9dHStoFPXjyuWr2fEumm79PLBBP.jpeg?height=600&width=800",
//   "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/2settle-history-26znpYyI4l6pFQWGNmKeMJki8PCxlO.jpeg?height=600&width=800",
//   "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/2settle-settings-FvRcDBIXZOepY2vZBOtl2xWH3EkEvC.jpeg?height=600&width=800",
//   // "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/2settle-transact-dDaLikq37arb6adYpZmL24vYziV4AB.png?height=600&width=800",

  // ],
  //   },
  //   {
  //     name: "SpaceMall",
  //     description: "A mobile app for shopping powered by blockchain and VR",
  //     image:
  //       "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/spacemall-website-46zM1oUv6zxaJvLDdy1TOxO2Np4yff.png?height=300&width=400",

  //     link: "https://spacemall.io",
  //     techStack: ["Dart", "Flutter", "Firebase"],
  //     mobileScreenshots: [
  // "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/stock-managent-DJEuQYxoKZv8d84iwlvmXPfcRi43bw.jpeg?height=600&width=300",
  // "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/set-profile-Y548iztbhPyFn4t2m7bpBH8ZtdpO61.JPG?height=600&width=300",
  // "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/categories-wYad4PXvadf4iDvnIM2kmdhVIcc6FW.JPG?height=600&width=300",
  // "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/add-store-68RAy7uNVQ28ddUU9AcdcrjFpdoGQa.JPG?height=600&width=300",
  // "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/low-stock-s0QUlWhtL1EEpT30G6kKkEHKYlTkT0.jpeg?height=600&width=300",
  //     ],
  //   },
  // ];

  // export default function Projects() {
  //   return (
  //     <section className="py-20 bg-white">
  //       <div className="container mx-auto px-4">
  //         <motion.h2
  //           initial={{ opacity: 0, y: 50 }}
  //           whileInView={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.5 }}
  //           className="text-4xl font-bold mb-8 text-center text-[#19485F]"
  //         >
  //           Projects
  //         </motion.h2>
  //         <div className="grid grid-cols-1 gap-16">
  //           {projects.map((project, index) => (
  //             <motion.div
  //               key={project.name}
  //               initial={{ opacity: 0, y: 50 }}
  //               whileInView={{ opacity: 1, y: 0 }}
  //               transition={{ duration: 0.5, delay: index * 0.2 }}
  //               className="bg-[#D9E0A4] rounded-lg overflow-hidden shadow-lg"
  //             >
  //               <div className="md:flex">
  //                 <div className="md:w-1/2 p-1 rounded">
  //                   <Image
  //                     src={project.image}
  //                     alt={project.name}
  //                     width={400}
  //                     height={300}
  //                     className="w-full h-48 md:h-full object-cover"
  //                   />
  //                 </div>
  //                 <div className="p-6 md:w-1/2">
  //                   <h3 className="text-2xl font-bold mb-2 text-[#19485F]">
  //                     {project.name}
  //                   </h3>
  //                   <p className="text-gray-700 mb-4">{project.description}</p>
  //                   <div className="mb-4">
  //                     <h4 className="text-lg font-semibold mb-2 text-[#19485F]">
  //                       Tech Stack:
  //                     </h4>
  //                     <div className="flex flex-wrap gap-2">
  //                       {project.techStack.map((tech) => (
  //                         <span
  //                           key={tech}
  //                           className="bg-[#19485F] text-white py-1 px-2 rounded-full text-sm"
  //                         >
  //                           {tech}
  //                         </span>
  //                       ))}
  //                     </div>
  //                   </div>
  //                   <a
  //                     href={project.link}
  //                     target="_blank"
  //                     rel="noopener noreferrer"
  //                     className="bg-[#19485F] text-white py-2 px-4 rounded-full inline-block hover:bg-opacity-80 transition-colors"
  //                   >
  //                     View Project
  //                   </a>
  //                 </div>
  //               </div>
  //               {project.webScreenshots && (
  //                 <div className="mt-4">
  //                   <WebScreenshots screenshots={project.webScreenshots} />
  //                 </div>
  //               )}
  //               {project.mobileScreenshots && (
  //                 <div className="mt-4">
  //                   <MobileScreenshots screenshots={project.mobileScreenshots} />
  //                 </div>
  //               )}
  //             </motion.div>
  //           ))}
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  "use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import MobileScreenshots from "../components/MobileScreenshots";
import WebScreenshots from "../components/WebScreenshots";
import { Project } from "@/types/projectsTypes";
import { getProjectsFromFirebase } from "@/firebaseOps";

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

  if (loading) {
    return <div className="text-center py-20">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

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
          {projects.map((project, index) => (
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
                  <p className="text-gray-700 mb-4">{project.description}</p>
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
              {project.webScreenshots && project.webScreenshots.length > 0 && (
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
      </div>
    </section>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import MobileScreenshots from "../components/MobileScreenshots";
// import WebScreenshots from "../components/WebScreenshots";
// import { Project } from "@/types/projectsTypes";
// import { getProjectsFromFirebase } from "@/firebaseOps";

// export default function Projects() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchProjects() {
//       try {
//         const fetchedProjects = await getProjectsFromFirebase();
//         const updatedProjects = fetchedProjects.map((project) => ({
//           ...project,
//           webScreenshots:
//             project.webScreenshots?.map((url) =>
//               url.includes("?")
//                 ? `${url}&height=600&width=800`
//                 : `${url}?height=600&width=800`
//             ) || [],
//           mobileScreenshots:
//             project.mobileScreenshots?.map((url) =>
//               url.includes("?")
//                 ? `${url}&height=600&width=300`
//                 : `${url}?height=600&width=300`
//             ) || [],
//         }));
//         setProjects(updatedProjects);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching projects:", err);
//         setError("Failed to load projects. Please try again later.");
//         setLoading(false);
//       }
//     }

//     fetchProjects();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-20">Loading projects...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-20 text-red-500">{error}</div>;
//   }

//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <motion.h2
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-4xl font-bold mb-8 text-center text-[#19485F]"
//         >
//           Projects
//         </motion.h2>
//         <div className="grid grid-cols-1 gap-16">
//           {projects.map((project, index) => (
//             <motion.div
//               key={project.name}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//               className="bg-[#D9E0A4] rounded-lg overflow-hidden shadow-lg"
//             >
//               <div className="md:flex">
//                 <div className="md:w-1/2 p-1 rounded">
//                   <Image
//                     src={project.image}
//                     alt={project.name}
//                     width={400}
//                     height={300}
//                     className="w-full h-48 md:h-full object-cover"
//                   />
//                 </div>
//                 <div className="p-6 md:w-1/2">
//                   <h3 className="text-2xl font-bold mb-2 text-[#19485F]">
//                     {project.name}
//                   </h3>
//                   <p className="text-gray-700 mb-4">{project.description}</p>
//                   <div className="mb-4">
//                     <h4 className="text-lg font-semibold mb-2 text-[#19485F]">
//                       Tech Stack:
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {project.techStack.map((tech) => (
//                         <span
//                           key={tech}
//                           className="bg-[#19485F] text-white py-1 px-2 rounded-full text-sm"
//                         >
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <a
//                     href={project.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-[#19485F] text-white py-2 px-4 rounded-full inline-block hover:bg-opacity-80 transition-colors"
//                   >
//                     View Project
//                   </a>
//                 </div>
//               </div>
//               {project.webScreenshots && project.webScreenshots.length > 0 && (
//                 <div className="mt-4">
//                   <WebScreenshots screenshots={project.webScreenshots} />
//                 </div>
//               )}
//               {project.mobileScreenshots &&
//                 project.mobileScreenshots.length > 0 && (
//                   <div className="mt-4">
//                     <MobileScreenshots
//                       screenshots={project.mobileScreenshots}
//                     />
//                   </div>
//                 )}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
