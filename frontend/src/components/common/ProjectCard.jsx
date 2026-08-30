import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card overflow-hidden group"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={project.images?.[0] || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%23e2e8f0' width='600' height='400'/%3E%3Ctext fill='%2394a3b8' font-family='sans-serif' font-size='20' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3EProject%3C/text%3E%3C/svg%3E"}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {project.featured && (
          <span className="absolute top-4 left-4 bg-primary-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
            Featured
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {project.shortDescription || project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack?.slice(0, 5).map((tech, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-sm text-sm"
            >
              Live Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline btn-sm text-sm"
            >
              GitHub
            </a>
          )}
          <Link
            to={`/projects/${project.slug || project._id}`}
            className="btn-secondary btn-sm text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
