import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import API from "../../services/api";
import { useCrud } from "../../hooks/useCrud";
import FileUpload from "../../components/admin/FileUpload";

const CertificateManager = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { create, update, remove, loading: crudLoading } = useCrud("/certificates");
  const [form, setForm] = useState({
    title: "",
    organization: "",
    issueDate: "",
    image: "",
    pdfUrl: "",
    credentialId: "",
    credentialUrl: "",
    order: 0,
  });

  const fetchData = async () => {
    try {
      const { data } = await API.get("/certificates");
      setCerts(data.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openModal = (item = null) => {
    setEditItem(item);
    setForm(item || { title: "", organization: "", issueDate: "", image: "", pdfUrl: "", credentialId: "", credentialUrl: "", order: 0 });
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
        <h1 className="text-2xl font-bold">Certificates</h1>
        <button onClick={() => openModal()} className="btn-primary btn-sm flex items-center gap-2"><FiPlus /> Add</button>
      </div>

      {loading ? <div className="card p-8 animate-pulse h-64" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((cert) => (
            <div key={cert._id} className="card overflow-hidden">
              {cert.image && <img src={cert.image} alt="" className="w-full h-40 object-cover" />}
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{cert.title}</p>
                  <p className="text-sm text-gray-500">{cert.organization}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal(cert)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><FiEdit2 size={16} className="text-primary-500" /></button>
                  <button onClick={() => handleDelete(cert._id)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"><FiTrash2 size={16} className="text-red-500" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{editItem ? "Edit" : "Add"} Certificate</h2>
                <button onClick={() => setShowModal(false)}><FiX size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" required />
                <input type="text" placeholder="Organization" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} className="input-field" />
                <input type="text" placeholder="Issue Date" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} className="input-field" />
                <FileUpload
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                  folder="portfolio/certificates"
                  label="Certificate Image"
                />
                <input type="url" placeholder="PDF URL" value={form.pdfUrl} onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })} className="input-field" />
                <input type="url" placeholder="Credential URL" value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })} className="input-field" />
                <button type="submit" disabled={crudLoading} className="btn-primary w-full">{crudLoading ? "Saving..." : "Save"}</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificateManager;
