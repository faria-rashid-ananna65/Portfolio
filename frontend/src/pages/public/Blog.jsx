import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import API from "../../services/api";
import SEO from "../../components/common/SEO";
import SectionTitle from "../../components/common/SectionTitle";
import BlogCard from "../../components/common/BlogCard";
import { CardSkeleton } from "../../components/common/Skeleton";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const params = { status: "published" };
        if (search) params.search = search;
        if (activeCategory !== "All") params.category = activeCategory;
        const { data } = await API.get("/blogs", { params });
        setBlogs(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [search, activeCategory]);

  const categories = ["All", ...new Set(blogs.map((b) => b.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title="Blog - Web Development Articles & Tutorials"
        description="Read my latest articles, tutorials, and thoughts on web development, programming, and technology."
        keywords="blog, web development articles, programming tutorials, tech blog, developer blog"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Blog" subtitle="Thoughts and tutorials" />

        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10 w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <Link key={blog._id} to={`/blog/${blog.slug || blog._id}`}>
              <BlogCard blog={blog} index={i} />
            </Link>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No blog posts found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
