import { useState, useEffect } from "react";
import { FiSave } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../../services/api";
import FileUpload from "../../components/admin/FileUpload";

const SettingsManager = () => {
  const [settings, setSettings] = useState({
    websiteName: "",
    logo: "",
    favicon: "",
    themeColor: "#6366f1",
    footerText: "",
    seoTitle: "",
    metaDescription: "",
    keywords: [],
    ogImage: "",
    googleAnalyticsId: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await API.get("/settings");
        if (data.data) setSettings(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await API.put("/settings", settings);
      toast.success("Settings saved!");
    } catch (err) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="card p-8 animate-pulse h-96" />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Website Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold">General</h2>
          <input
            type="text"
            placeholder="Website Name"
            value={settings.websiteName}
            onChange={(e) => setSettings({ ...settings, websiteName: e.target.value })}
            className="input-field"
          />
          <FileUpload
            value={settings.logo}
            onChange={(url) => setSettings({ ...settings, logo: url })}
            folder="portfolio/settings"
            label="Logo"
          />
          <FileUpload
            value={settings.favicon}
            onChange={(url) => setSettings({ ...settings, favicon: url })}
            folder="portfolio/settings"
            label="Favicon"
          />
          <div>
            <label className="block text-sm font-medium mb-2">Theme Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.themeColor}
                onChange={(e) => setSettings({ ...settings, themeColor: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer"
              />
              <input
                type="text"
                value={settings.themeColor}
                onChange={(e) => setSettings({ ...settings, themeColor: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          <textarea
            placeholder="Footer Text"
            value={settings.footerText}
            onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
            className="textarea-field"
            rows={2}
          />
        </div>

        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold">SEO</h2>
          <input
            type="text"
            placeholder="SEO Title"
            value={settings.seoTitle}
            onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
            className="input-field"
          />
          <textarea
            placeholder="Meta Description"
            value={settings.metaDescription}
            onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
            className="textarea-field"
            rows={3}
          />
          <input
            type="text"
            placeholder="Keywords (comma separated)"
            value={settings.keywords?.join(", ")}
            onChange={(e) =>
              setSettings({ ...settings, keywords: e.target.value.split(",").map((s) => s.trim()) })
            }
            className="input-field"
          />
          <FileUpload
            value={settings.ogImage}
            onChange={(url) => setSettings({ ...settings, ogImage: url })}
            folder="portfolio/settings"
            label="Open Graph Image"
          />
          <input
            type="text"
            placeholder="Google Analytics ID"
            value={settings.googleAnalyticsId}
            onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
            className="input-field"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="btn-primary flex items-center gap-2"
      >
        <FiSave /> {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
};

export default SettingsManager;
