

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

interface MobileScreenshotsProps {
  screenshots: string[];
}

export default function MobileScreenshots({
  screenshots,
}: MobileScreenshotsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      setScrollWidth(scrollRef.current.scrollWidth);
    }
  }, [screenshots]);

  return (
    <div className="py-10 overflow-hidden">
      <h4 className="text-xl font-bold mb-6 text-center text-[#19485F]">
        App Screenshots
      </h4>
      <div className="relative w-full">
        <div
          ref={scrollRef}
          className="flex space-x-4 animate-scroll hover:pause"
          style={{
            width: `${scrollWidth}px`,
          }}
        >
          {screenshots.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0"
            >
              <Image
                src={src}
                alt={`App Screenshot ${index + 1}`}
                width={300}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
