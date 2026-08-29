import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../../services/api";
import { useCrud } from "../../hooks/useCrud";

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editSkill, setEditSkill] = useState(null);
  const { create, update, remove, loading: crudLoading } = useCrud("/skills");
  const [form, setForm] = useState({
    name: "",
    icon: "",
    percentage: 0,
    category: "Frontend",
    order: 0,
  });

  const categories = ["Frontend", "Backend", "Database", "Authentication", "Tools", "Other"];

  const fetchSkills = async () => {
    try {
      const { data } = await API.get("/skills");
      setSkills(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openModal = (skill = null) => {
    if (skill) {
      setEditSkill(skill);
      setForm(skill);
    } else {
      setEditSkill(null);
      setForm({ name: "", icon: "", percentage: 0, category: "Frontend", order: 0 });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editSkill) {
        await update(editSkill._id, form);
      } else {
        await create(form);
      }
      fetchSkills();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await remove(id);
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Skills</h1>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2 btn-sm">
          <FiPlus /> Add Skill
        </button>
      </div>

      {loading ? (
        <div className="card p-8 animate-pulse h-64" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill._id} className="card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{skill.icon || "🔧"}</span>
                <div>
                  <p className="font-semibold">{skill.name}</p>
                  <p className="text-xs text-gray-500">{skill.category} • {skill.percentage}%</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openModal(skill)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <FiEdit2 size={16} className="text-primary-500" />
                </button>
                <button onClick={() => handleDelete(skill._id)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <FiTrash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
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
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{editSkill ? "Edit Skill" : "Add Skill"}</h2>
                <button onClick={() => setShowModal(false)} className="p-1">
                  <FiX size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Skill Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  placeholder="Icon (emoji or text)"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="input-field"
                />
                <input
                  type="number"
                  placeholder="Percentage"
                  value={form.percentage}
                  onChange={(e) => setForm({ ...form, percentage: Number(e.target.value) })}
                  className="input-field"
                  min="0"
                  max="100"
                />
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Order"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className="input-field"
                />
                <button type="submit" disabled={crudLoading} className="btn-primary w-full">
                  {crudLoading ? "Saving..." : "Save Skill"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillManager;
