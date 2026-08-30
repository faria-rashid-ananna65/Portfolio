import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowLeft } from "react-icons/fi";
import API from "../../services/api";
import SEO from "../../components/common/SEO";
import Skeleton from "../../components/common/Skeleton";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await API.get(`/projects/${id}`);
        setProject(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
        <Skeleton className="h-80 w-full mb-8" />
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-24 text-center">
        <p className="text-gray-500">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title={`${project.title} - Project Details`}
        description={project.shortDescription || project.description?.substring(0, 160) || `Details about ${project.title} project`}
        keywords={project.techStack?.join(", ") || "web project, Faria WebDev"}
        image={project.images?.[0]}
        type="article"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-primary-600 mb-8 hover:underline"
        >
          <FiArrowLeft /> Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {project.images?.length > 0 && (
            <div className="mb-8">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          )}

          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
            {project.featured && (
              <span className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            {project.description || project.shortDescription}
          </p>

          <div className="flex gap-4 mb-8">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <FiExternalLink /> Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <FiGithub /> Source Code
              </a>
            )}
          </div>

          {project.techStack?.length > 0 && (
            <div className="card p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.features?.length > 0 && (
            <div className="card p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <ul className="space-y-2">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <span className="text-primary-500 mt-1">▸</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.challenges?.length > 0 && (
            <div className="card p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Challenges</h3>
              <ul className="space-y-2">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <span className="text-yellow-500 mt-1">⚡</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.learningOutcomes?.length > 0 && (
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Learning Outcomes</h3>
              <ul className="space-y-2">
                {project.learningOutcomes.map((l, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <span className="text-green-500 mt-1">✦</span> {l}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
