"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface WebScreenshotsProps {
  screenshots: string[];
}

export default function WebScreenshots({ screenshots }: WebScreenshotsProps) {
  return (
    <div className="py-10">
      <h4 className="text-xl font-bold mb-6 text-center text-[#19485F]">
        Web App Screenshots
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
        {screenshots.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative aspect-video "
          >
            <Image
              src={src}
              alt={`Web Screenshot ${index + 1}`}
              fill
              className="rounded-lg shadow-lg object-cover "
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
