import { motion } from "framer-motion";

const BlogCard = ({ blog, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card overflow-hidden group"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={blog.coverImage || "https://via.placeholder.com/600x300"}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {blog.category && (
          <span className="absolute top-4 left-4 bg-primary-600 text-white text-xs px-3 py-1 rounded-full">
            {blog.category}
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          <span>{blog.readingTime || 5} min read</span>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {blog.excerpt}
        </p>
      </div>
    </motion.div>
  );
};

export default BlogCard;
