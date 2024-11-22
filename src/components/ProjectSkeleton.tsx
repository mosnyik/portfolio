import { motion } from "framer-motion";

export default function ProjectSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-200 rounded-lg overflow-hidden shadow-lg animate-pulse"
    >
      <div className="md:flex">
        <div className="md:w-1/2 p-1 rounded">
          <div className="w-full h-48 md:h-64 bg-gray-300" />
        </div>
        <div className="p-6 md:w-1/2">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-300 rounded w-full mb-2" />
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-4" />
          <div className="mb-4">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-2" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 w-16 bg-gray-300 rounded-full" />
              ))}
            </div>
          </div>
          <div className="h-10 w-32 bg-gray-300 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}
