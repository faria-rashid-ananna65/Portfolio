import { useState, useEffect } from "react";
import { FiSearch, FiTrash2, FiMail, FiInbox } from "react-icons/fi";
import API from "../../services/api";

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const fetchMessages = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      const { data } = await API.get("/messages", { params });
      setMessages(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [search]);

  const toggleRead = async (msg) => {
    try {
      await API.put(`/messages/${msg._id}`, { isRead: !msg.isRead });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete message?")) return;
    try {
      await API.delete(`/messages/${id}`);
      fetchMessages();
      if (selected && selected._id === id) setSelected(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
          {loading ? (
            <div className="card p-4 animate-pulse h-20" />
          ) : messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No messages</div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => setSelected(msg)}
                className={`card p-4 cursor-pointer transition-all hover:border-primary-500 ${
                  selected && selected._id === msg._id ? "border-primary-500" : ""
                } ${!msg.isRead ? "border-l-4 border-l-primary-500" : ""}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{msg.name}</p>
                    <p className="text-xs text-gray-500">{msg.email}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      {msg.subject || msg.message}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div className="card p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold">{selected.subject || "No Subject"}</h2>
                  <p className="text-gray-500">From: {selected.name} ({selected.email})</p>
                  <p className="text-xs text-gray-400">
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleRead(selected)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    title={selected.isRead ? "Mark unread" : "Mark read"}
                  >
                    {selected.isRead ? <FiMail size={18} /> : <FiInbox size={18} />}
                  </button>
                  <button
                    onClick={() => handleDelete(selected._id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-red-500"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>
          ) : (
            <div className="card p-12 text-center text-gray-500">
              Select a message to view
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageManager;
