import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiStar } from "react-icons/fi";
import API from "../../services/api";
import { useCrud } from "../../hooks/useCrud";

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { create, update, remove, loading: crudLoading } = useCrud("/testimonials");
  const [form, setForm] = useState({
    name: "",
    company: "",
    photo: "",
    rating: 5,
    feedback: "",
    order: 0,
  });

  const fetchData = async () => {
    try {
      const { data } = await API.get("/testimonials");
      setTestimonials(data.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openModal = (item = null) => {
    setEditItem(item);
    setForm(item || { name: "", company: "", photo: "", rating: 5, feedback: "", order: 0 });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) await update(editItem._id, form);
      else await create(form);
      fetchData();
      setShowModal(false);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    try { await remove(id); fetchData(); } catch (err) { console.error(err); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <button onClick={() => openModal()} className="btn-primary btn-sm flex items-center gap-2"><FiPlus /> Add</button>
      </div>

      {loading ? <div className="card p-8 animate-pulse h-64" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t._id} className="card p-4">
              <div className="flex items-center gap-3 mb-3">
                {t.photo && <img src={t.photo} alt="" className="w-10 h-10 rounded-full object-cover" />}
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.company}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FiStar key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">{t.feedback}</p>
              <div className="flex gap-2">
                <button onClick={() => openModal(t)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><FiEdit2 size={16} className="text-primary-500" /></button>
                <button onClick={() => handleDelete(t._id)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><FiTrash2 size={16} className="text-red-500" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{editItem ? "Edit" : "Add"} Testimonial</h2>
                <button onClick={() => setShowModal(false)}><FiX size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
                <input type="text" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="input-field" />
                <input type="url" placeholder="Photo URL" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} className="input-field" />
                <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="input-field">
                  {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
                </select>
                <textarea placeholder="Feedback" value={form.feedback} onChange={(e) => setForm({ ...form, feedback: e.target.value })} className="textarea-field" rows={4} />
                <button type="submit" disabled={crudLoading} className="btn-primary w-full">{crudLoading ? "Saving..." : "Save"}</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestimonialManager;
