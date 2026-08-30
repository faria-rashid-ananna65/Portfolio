import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiExternalLink, FiGithub } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../../services/api";
import { useCrud } from "../../hooks/useCrud";
import FileUpload from "../../components/admin/FileUpload";

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const { create, update, remove, loading: crudLoading } = useCrud("/projects");
  const [form, setForm] = useState({
    title: "",
    description: "",
    shortDescription: "",
    images: [],
    techStack: [],
    category: "All",
    featured: false,
    liveLink: "",
    githubLink: "",
    features: [],
    challenges: [],
    learningOutcomes: [],
    order: 0,
  });

  const categories = ["All", "React", "MERN", "Full Stack", "Socket.io"];

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openModal = (project = null) => {
    if (project) {
      setEditProject(project);
      setForm(project);
    } else {
      setEditProject(null);
      setForm({
        title: "",
        description: "",
        shortDescription: "",
        images: [],
        techStack: [],
        category: "All",
        featured: false,
        liveLink: "",
        githubLink: "",
        features: [],
        challenges: [],
        learningOutcomes: [],
        order: 0,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...form,
        techStack: typeof form.techStack === "string" ? form.techStack.split(",").map((s) => s.trim()) : form.techStack,
        features: typeof form.features === "string" ? form.features.split("\n").filter(Boolean) : form.features,
        challenges: typeof form.challenges === "string" ? form.challenges.split("\n").filter(Boolean) : form.challenges,
        learningOutcomes: typeof form.learningOutcomes === "string" ? form.learningOutcomes.split("\n").filter(Boolean) : form.learningOutcomes,
        images: typeof form.images === "string" ? form.images.split("\n").filter(Boolean) : form.images,
      };
      if (editProject) {
        await update(editProject._id, data);
      } else {
        await create(data);
      }
      fetchProjects();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await remove(id);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2 btn-sm">
          <FiPlus /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="card p-8 animate-pulse h-64" />
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project._id} className="card p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {project.images?.[0] && (
                  <img src={project.images[0]} alt="" className="w-16 h-16 rounded-lg object-cover" />
                )}
                <div>
                  <p className="font-semibold flex items-center gap-2">
                    {project.title}
                    {project.featured && (
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">Featured</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{project.category} • {project.techStack?.length || 0} techs</p>
                </div>
              </div>
              <div className="flex gap-2">
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <FiExternalLink size={16} className="text-green-500" />
                  </a>
                )}
                <button onClick={() => openModal(project)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <FiEdit2 size={16} className="text-primary-500" />
                </button>
                <button onClick={() => handleDelete(project._id)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <FiTrash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{editProject ? "Edit Project" : "Add Project"}</h2>
                <button onClick={() => setShowModal(false)} className="p-1"><FiX size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Project Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" required />
                <input type="text" placeholder="Short Description" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className="input-field" />
                <textarea placeholder="Full Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="textarea-field" rows={4} />
                <FileUpload
                  value={typeof form.images === "string" ? form.images : form.images?.[0] || ""}
                  onChange={(url) => setForm({ ...form, images: url ? [url] : [] })}
                  folder="portfolio/projects"
                  label="Project Image"
                />
                {form.images?.[0] && (
                  <input type="text" placeholder="Or paste additional image URLs (one per line)" value={form.images?.slice(1).join("\n")} onChange={(e) => setForm({ ...form, images: [form.images[0], ...e.target.value.split("\n").filter(Boolean)] })} className="textarea-field" rows={2} />
                )}
                <input type="text" placeholder="Tech Stack (comma separated)" value={typeof form.techStack === "string" ? form.techStack : form.techStack?.join(", ")} onChange={(e) => setForm({ ...form, techStack: e.target.value })} className="input-field" />
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input type="url" placeholder="Live Link" value={form.liveLink} onChange={(e) => setForm({ ...form, liveLink: e.target.value })} className="input-field" />
                <input type="url" placeholder="GitHub Link" value={form.githubLink} onChange={(e) => setForm({ ...form, githubLink: e.target.value })} className="input-field" />
                <textarea placeholder="Features (one per line)" value={form.features?.join("\n")} onChange={(e) => setForm({ ...form, features: e.target.value })} className="textarea-field" rows={3} />
                <textarea placeholder="Challenges (one per line)" value={form.challenges?.join("\n")} onChange={(e) => setForm({ ...form, challenges: e.target.value })} className="textarea-field" rows={3} />
                <textarea placeholder="Learning Outcomes (one per line)" value={form.learningOutcomes?.join("\n")} onChange={(e) => setForm({ ...form, learningOutcomes: e.target.value })} className="textarea-field" rows={3} />
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" />
                  <span>Featured Project</span>
                </label>
                <button type="submit" disabled={crudLoading} className="btn-primary w-full">
                  {crudLoading ? "Saving..." : "Save Project"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectManager;
