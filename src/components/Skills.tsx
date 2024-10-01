"use client";

import { motion } from "framer-motion";

const skills = [
  "JavaScript",
  "TypeScript",
  "Dart",
  "Java",
  "Solidity",
  "Clarity",
  "React",
  "Next.js",
  "Node.js",
  "Flutter",
  "MySQL",
  "Firebase",
  "OOP",
  "Data Structures",
  "Algorithms",
  "and more",
];

export default function Skills() {
  return (
    <section className="py-20 bg-[#D9E0A4]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center text-[#19485F]"
        >
          Some Tools In My Toolkit
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-bold mb-8 text-center text-[#19485F]"
          style={{ textShadow: "1px 1px 2px white" }}
        >
          I will combine these tools and many more as required by your use case
          to give your idea life
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#19485F] text-white py-2 px-4 rounded-full text-lg"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
