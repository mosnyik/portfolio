"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl max-w-3xl mx-auto text-center"
        >
          I am a passionate software engineer with expertise in web and mobile
          development. My journey in the world of programming has led me to work
          on exciting projects and continuously expand my skill set.
        </motion.p>
      </div>
    </section>
  );
}
