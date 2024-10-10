"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSkills } from "@/app/actions";
import { Skill } from "@/types/skillTypes";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const fetchedSkills = await getSkills();
        setSkills(fetchedSkills);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills. Please try again later.");
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading skills...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

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
              key={skill.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#19485F] text-white py-2 px-4 rounded-full text-lg"
            >
              {skill.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
