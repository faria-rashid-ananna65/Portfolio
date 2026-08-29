import { motion } from "framer-motion";

const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card p-6 group hover:border-primary-500/50"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          {skill.icon || "🔧"}
        </div>
        <div>
          <h3 className="font-semibold">{skill.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {skill.category}
          </p>
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 }}
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2.5 rounded-full"
        />
      </div>
      <p className="text-right text-sm text-gray-500 mt-1">
        {skill.percentage}%
      </p>
    </motion.div>
  );
};

export default SkillCard;
