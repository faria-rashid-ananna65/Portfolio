import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../../services/api";
import SEO from "../../components/common/SEO";
import SectionTitle from "../../components/common/SectionTitle";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/profile");
        setProfile(data.data);
      } catch {}
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);
      await API.post("/messages", form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: FiMail, label: "Email", value: profile?.email || "hello@example.com", href: `mailto:${profile?.email || "hello@example.com"}` },
    { icon: FiPhone, label: "Phone", value: profile?.phone || "+1 234 567 890", href: `tel:${profile?.phone || "+1234567890"}` },
    { icon: FiMapPin, label: "Location", value: profile?.location || "Dhaka, Bangladesh", href: null },
  ];

  const socialLinks = profile?.socialLinks || {};

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title="Contact Me - Get In Touch"
        description="Get in touch for collaborations, projects, or just a friendly hello. Contact information and social links available."
        keywords="contact developer, hire developer, get in touch, web developer contact, freelance developer"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Contact Me" subtitle="Let's work together" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {contactInfo.map((info, i) => (
              <div key={i} className="card p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                  <info.icon size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="font-semibold hover:text-primary-600 transition-colors">{info.value}</a>
                  ) : (
                    <p className="font-semibold">{info.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-4 pt-4">
              {socialLinks.github && <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-all"><FaGithub size={18} /></a>}
              {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-all"><FaLinkedin size={18} /></a>}
              {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-all"><FaFacebook size={18} /></a>}
              {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-all"><FaTwitter size={18} /></a>}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Your name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" placeholder="your@email.com" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} className="input-field" placeholder="Subject" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={6} className="textarea-field" placeholder="Your message..." required />
              </div>
              <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 w-full justify-center disabled:opacity-50">
                <FiSend /> {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
