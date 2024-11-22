import { motion } from "framer-motion";

export default function SkillSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-300 py-2 px-4 rounded-full h-10 w-24 animate-pulse"
    />
  );
}
