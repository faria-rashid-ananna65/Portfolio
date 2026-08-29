import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiEye, FiEyeOff } from "react-icons/fi";
import API from "../../services/api";
import { useCrud } from "../../hooks/useCrud";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { create, update, remove, loading: crudLoading } = useCrud("/blogs");
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    coverImage: "",
    category: "",
    tags: [],
    status: "draft",
    readingTime: 5,
  });

  const fetchData = async () => {
    try {
      const { data } = await API.get("/blogs");
      setBlogs(data.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openModal = (item = null) => {
    setEditItem(item);
    setForm(item || { title: "", content: "", excerpt: "", coverImage: "", category: "", tags: [], status: "draft", readingTime: 5 });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, tags: typeof form.tags === "string" ? form.tags.split(",").map((s) => s.trim()) : form.tags };
      if (editItem) await update(editItem._id, data);
      else await create(data);
      fetchData();
      setShowModal(false);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    try { await remove(id); fetchData(); } catch (err) { console.error(err); }
  };

  const toggleStatus = async (blog) => {
    try {
      await update(blog._id, { status: blog.status === "published" ? "draft" : "published" });
      fetchData();
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <button onClick={() => openModal()} className="btn-primary btn-sm flex items-center gap-2"><FiPlus /> Add Blog</button>
      </div>

      {loading ? <div className="card p-8 animate-pulse h-64" /> : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="card p-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                {blog.coverImage && <img src={blog.coverImage} alt="" className="w-16 h-16 rounded-lg object-cover" />}
                <div>
                  <p className="font-semibold">{blog.title}</p>
                  <p className="text-sm text-gray-500">{blog.category} • {blog.readingTime} min</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {blog.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleStatus(blog)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  {blog.status === "published" ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
                <button onClick={() => openModal(blog)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><FiEdit2 size={16} className="text-primary-500" /></button>
                <button onClick={() => handleDelete(blog._id)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><FiTrash2 size={16} className="text-red-500" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{editItem ? "Edit" : "Add"} Blog</h2>
                <button onClick={() => setShowModal(false)}><FiX size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" required />
                <textarea placeholder="Content (HTML supported)" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="textarea-field" rows={10} />
                <textarea placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="textarea-field" rows={3} />
                <input type="url" placeholder="Cover Image URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} className="input-field" />
                <input type="text" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field" />
                <input type="text" placeholder="Tags (comma separated)" value={typeof form.tags === "string" ? form.tags : form.tags?.join(", ")} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="input-field" />
                <div className="flex gap-4">
                  <input type="number" placeholder="Reading Time" value={form.readingTime} onChange={(e) => setForm({ ...form, readingTime: Number(e.target.value) })} className="input-field" />
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <button type="submit" disabled={crudLoading} className="btn-primary w-full">{crudLoading ? "Saving..." : "Save"}</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogManager;
