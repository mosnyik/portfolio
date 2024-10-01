"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface BackgroundSliderProps {
  images: string[];
  interval?: number;
}

export default function BackgroundSlider({
  images,
  interval = 5000,
}: BackgroundSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<number[]>([0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        if (!loadedImages.includes(nextIndex)) {
          setLoadedImages((prev) => [...prev, nextIndex]);
        }
        return nextIndex;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval, loadedImages]);

  // Preload the next image
  useEffect(() => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    if (!loadedImages.includes(nextIndex)) {
      setLoadedImages((prev) => [...prev, nextIndex]);
    }
  }, [currentImageIndex, images.length, loadedImages]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        {loadedImages.map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{ zIndex: 1 }}
          >
            <Image
              src={images[index]}
              alt={`Background ${index + 1}`}
              layout="fill"
              objectFit="cover"
              quality={100}
              priority={index === currentImageIndex}
            /> 
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="absolute inset-0 bg-black opacity-75 z-10"></div>
    </div>
  );
}
