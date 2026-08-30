import { useState, useRef } from "react";
import { FiUpload, FiX, FiImage } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../../services/api";

const FileUpload = ({ value, onChange, folder = "portfolio", accept = "image/*", label = "Upload Image" }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const uploadFile = async (file) => {
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      toast.error("File too large. Max size: 20MB");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    try {
      setUploading(true);
      const { data } = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        onChange(data.url);
        toast.success("Uploaded!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    uploadFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    uploadFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          dragOver ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-300 dark:border-gray-600 hover:border-primary-400"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-500">Uploading...</span>
          </div>
        ) : value ? (
          <div className="flex items-center gap-3">
            <img src={value} alt="Preview" className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover" />
            <div className="flex-1 text-left text-sm text-gray-500 truncate">{value}</div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(""); }}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <FiX size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-2">
            <FiImage size={24} className="text-gray-400" />
            <span className="text-sm text-gray-500">Click or drag image to upload</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
