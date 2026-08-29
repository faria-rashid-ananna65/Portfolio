import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-primary-200 dark:border-primary-900 rounded-full" />
          <div className="absolute inset-0 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium animate-pulse">
          Loading...
        </p>
      </motion.div>
    </div>
  );
};

export default Loading;
