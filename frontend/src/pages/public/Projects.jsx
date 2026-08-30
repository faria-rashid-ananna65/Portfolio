import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import SEO from "../../components/common/SEO";
import SectionTitle from "../../components/common/SectionTitle";
import ProjectCard from "../../components/common/ProjectCard";
import { CardSkeleton } from "../../components/common/Skeleton";
import { FiSearch } from "react-icons/fi";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "React", "MERN", "Full Stack", "Socket.io"];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const params = {};
        if (activeCategory !== "All") params.category = activeCategory;
        if (search) params.search = search;
        const { data } = await API.get("/projects", { params });
        setProjects(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [activeCategory, search]);

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
        title="Projects - Faria WebDev"
        description="Browse through projects by Faria WebDev including React, MERN stack, and full stack applications."
        keywords="Faria WebDev projects, React projects, MERN stack, web development, full stack applications"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="My Projects"
          subtitle="Some of my recent work"
        />

        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
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
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10 w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
