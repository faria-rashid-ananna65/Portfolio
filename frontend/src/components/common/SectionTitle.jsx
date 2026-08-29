import { motion } from "framer-motion";

const SectionTitle = ({ title, subtitle, center = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${center ? "text-center" : ""}`}
    >
      <h2 className="section-title">
        {title.split(" ").map((word, i) => (
          <span key={i}>
            {i === title.split(" ").length - 1 ? (
              <span className="gradient-text">{word}</span>
            ) : (
              word + " "
            )}
          </span>
        ))}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionTitle;
