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
          src={blog.coverImage || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='300'%3E%3Crect fill='%23e2e8f0' width='600' height='300'/%3E%3Ctext fill='%2394a3b8' font-family='sans-serif' font-size='20' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3EBlog%3C/text%3E%3C/svg%3E"}
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
