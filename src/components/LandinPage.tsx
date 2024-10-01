"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import BackgroundSlider from "./BackgroundSlider";

export default function LandingPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  const backgroundImages = [
    "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/spacemall-website-46zM1oUv6zxaJvLDdy1TOxO2Np4yff.png",
    "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/look-up-vsotAzUO3hA1MDh00ph74j1numy1uz.jpeg",
    "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/2settle-home-97SNaLHJxGz2WafkMLgP47FIodlChB.jpeg",
    "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/lagos-6MTypn6mOIVIwwNgnmR6P2ZHbnQE2h.jpeg",
    "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/code-1-t9Okjf9D9MoVnNlRFHaOWYYFWRm59b.jpeg",
    "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/head-down-D5lBLigiMQb46eJgW2no2SwiWsJMeA.jpeg",
    "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/tech-unwind-kUFxz0Pd1okhBso91HGJbONQl57Z5A.jpeg",
    "https://gbo1qdj0roz2nqut.public.blob.vercel-storage.com/in-the-office-5PwpeocxAwOflz4p6vggaYceEqNLOx.jpeg",
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center text-white relative overflow-hidden"
    >
      <BackgroundSlider images={backgroundImages} interval={7000} />
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="z-20 text-center"
      >
        <h1 className="text-6xl font-bold mb-4">Nyikwagh Moses</h1>
        <h2 className="text-3xl mb-8">Software Engineer</h2>
        <p className="text-xl max-w-2xl mx-auto">
          Specializing in full stack web, mobile development and smart contract
          development, with expertise in resilient system architecture and
          design.
        </p>
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </motion.div>
    </section>
  );
}
