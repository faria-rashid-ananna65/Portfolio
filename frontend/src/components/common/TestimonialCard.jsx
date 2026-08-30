import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card p-8 relative"
    >
      <div className="absolute top-6 right-6 text-6xl text-primary-200 dark:text-primary-900/50 font-serif leading-none">
        &ldquo;
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-sm" />
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6 relative z-10">
        {testimonial.feedback}
      </p>
      <div className="flex items-center gap-4">
        <img
          src={testimonial.photo || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Crect fill='%236366f1' width='50' height='50' rx='25'/%3E%3Ctext fill='%23fff' font-family='sans-serif' font-size='18' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3E%3F%3C/text%3E%3C/svg%3E"}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
