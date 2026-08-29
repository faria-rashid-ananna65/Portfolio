import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiClock, FiCalendar } from "react-icons/fi";
import API from "../../services/api";
import SEO from "../../components/common/SEO";
import Skeleton from "../../components/common/Skeleton";
import BlogCard from "../../components/common/BlogCard";

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await API.get(`/blogs/${slug}`);
        setBlog(data.data);

        const related = await API.get("/blogs", {
          params: { status: "published" },
        });
        setRelatedBlogs(
          related.data.data
            .filter((b) => b._id !== data.data._id)
            .slice(0, 3)
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
        <Skeleton className="h-80 w-full mb-8" />
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-24 text-center">
        <p className="text-gray-500">Blog post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title={`${blog.title} - Blog Post`}
        description={blog.excerpt || blog.content?.replace(/<[^>]*>/g, "").substring(0, 160) || `Read about ${blog.title}`}
        keywords={blog.tags?.join(", ") || blog.category || "blog, web development, programming"}
        image={blog.coverImage}
        type="article"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-primary-600 mb-8 hover:underline"
        >
          <FiArrowLeft /> Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {blog.coverImage && (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-80 object-cover rounded-2xl mb-8"
            />
          )}

          <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <FiCalendar /> {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <FiClock /> {blog.readingTime || 5} min read
            </span>
            {blog.category && (
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs">
                {blog.category}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8">{blog.title}</h1>

          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.article>

        {relatedBlogs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((b, i) => (
                <Link key={b._id} to={`/blog/${b.slug || b._id}`}>
                  <BlogCard blog={b} index={i} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
