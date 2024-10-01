// "use client";

// import { motion } from "framer-motion";
// import { Code, Smartphone, Database, Briefcase } from "lucide-react";

// const skills = [
//   { name: "JavaScript", icon: Code },
//   { name: "TypeScript", icon: Code },
//   { name: "React", icon: Code },
//   { name: "Next.js", icon: Code },
//   { name: "Node.js", icon: Code },
//   { name: "Flutter", icon: Smartphone },
//   { name: "Dart", icon: Code },
//   { name: "Solidity", icon: Code },
//   { name: "Clarity", icon: Code },
//   { name: "MySQL", icon: Database },
//   { name: "Firebase", icon: Database },
// ];

// const projects = [
//   {
//     name: "Project 1",
//     description: "A web application built with React and Next.js",
//   },
//   { name: "Project 2", description: "Mobile app developed using Flutter" },
//   { name: "Project 3", description: "Smart contract written in Solidity" },
// ];

// export default function Content() {
//   return (
//     <div className="bg-[#ECE7E2] text-[#4A7766]">
//       <section id="about" className="py-20">
//         <div className="container mx-auto px-4">
//           <motion.h2
//             initial={{ y: 20, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl font-bold mb-8 text-center"
//           >
//             About Me
//           </motion.h2>
//           <motion.p
//             initial={{ y: 20, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-lg max-w-2xl mx-auto text-center"
//           >
//             I'm a passionate software engineer with expertise in web and mobile
//             development. My skills span across various technologies, allowing me
//             to create robust and innovative solutions for complex problems.
//           </motion.p>
//         </div>
//       </section>

//       <section id="skills" className="py-20 bg-[#EE8E46] text-white">
//         <div className="container mx-auto px-4">
//           <motion.h2
//             initial={{ y: 20, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl font-bold mb-8 text-center"
//           >
//             Skills
//           </motion.h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {skills.map((skill, index) => (
//               <motion.div
//                 key={skill.name}
//                 initial={{ y: 20, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="flex items-center bg-white bg-opacity-20 rounded-lg p-4"
//               >
//                 <skill.icon className="w-6 h-6 mr-2" />
//                 <span>{skill.name}</span>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section id="projects" className="py-20">
//         <div className="container mx-auto px-4">
//           <motion.h2
//             initial={{ y: 20, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl font-bold mb-8 text-center"
//           >
//             Projects
//           </motion.h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {projects.map((project, index) => (
//               <motion.div
//                 key={project.name}
//                 initial={{ y: 20, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="bg-white rounded-lg shadow-lg p-6"
//               >
//                 <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
//                 <p className="text-gray-600">{project.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section id="contact" className="py-20 bg-[#EE8E46] text-white">
//         <div className="container mx-auto px-4">
//           <motion.h2
//             initial={{ y: 20, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl font-bold mb-8 text-center"
//           >
//             Contact Me
//           </motion.h2>
//           <motion.form
//             initial={{ y: 20, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="max-w-md mx-auto"
//           >
//             <div className="mb-4">
//               <label htmlFor="name" className="block mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 className="w-full px-3 py-2 text-gray-800 rounded"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="email" className="block mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className="w-full px-3 py-2 text-gray-800 rounded"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="message" className="block mb-2">
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 rows={4}
//                 className="w-full px-3 py-2 text-gray-800 rounded"
//                 required
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="bg-white text-[#EE8E46] px-6 py-2 rounded font-semibold hover:bg-opacity-90 transition-colors duration-300"
//             >
//               Send Message
//             </button>
//           </motion.form>
//         </div>
//       </section>
//     </div>
//   );
// }


"use client";

import { motion } from "framer-motion";
import { Code, Smartphone, Database } from "lucide-react";
import Link from "next/link";

const skills = [
  { name: "JavaScript", icon: Code },
  { name: "TypeScript", icon: Code },
  { name: "React", icon: Code },
  { name: "Next.js", icon: Code },
  { name: "Node.js", icon: Code },
  { name: "Flutter", icon: Smartphone },
  { name: "Dart", icon: Code },
  { name: "Solidity", icon: Code },
  { name: "Clarity", icon: Code },
  { name: "MySQL", icon: Database },
  { name: "Firebase", icon: Database },
];

const projects = [
  {
    name: "Project 1",
    description: "A web application built with React and Next.js",
  },
  { name: "Project 2", description: "Mobile app developed using Flutter" },
  { name: "Project 3", description: "Smart contract written in Solidity" },
];

export default function Content() {
  return (
    <div className="bg-[#ECE7E2] text-[#4A7766] min-h-screen">
      <nav className="bg-[#4A7766] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Nyikwagh Moses
          </Link>
          <Link href="mailto:mosnyik@gmail.com" className="hover:underline">
            Contact Me
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <section id="about" className="mb-16">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg"
          >
            I'm a passionate software engineer with expertise in web and mobile
            development. My skills span across various technologies, allowing me
            to create robust and innovative solutions for complex problems.
          </motion.p>
        </section>

        <section id="skills" className="mb-16">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Skills
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center bg-white bg-opacity-20 rounded-lg p-3"
              >
                <skill.icon className="w-6 h-6 mr-2 text-[#4A7766]" />
                <span>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2 text-[#4A7766]">
                  {project.name}
                </h3>
                <p className="text-gray-600">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <footer className="bg-[#4A7766] text-white py-4 mt-16">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Nyikwagh Moses. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}