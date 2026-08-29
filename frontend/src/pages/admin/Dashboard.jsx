import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCode,
  FiBook,
  FiStar,
  FiMessageSquare,
} from "react-icons/fi";
import API from "../../services/api";
import { getSocket } from "../../services/socket";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/dashboard");
        setStats(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();

    const socket = getSocket();
    if (socket) {
      socket.on("newMessage", () => {
        setStats((prev) =>
          prev ? { ...prev, unreadMessages: prev.unreadMessages + 1 } : prev
        );
      });
    }

    return () => {
      if (socket) socket.off("newMessage");
    };
  }, []);

  const statCards = [
    { label: "Total Projects", value: stats?.totalProjects || 0, icon: FiBriefcase, color: "bg-blue-500" },
    { label: "Total Skills", value: stats?.totalSkills || 0, icon: FiCode, color: "bg-green-500" },
    { label: "Total Blogs", value: stats?.totalBlogs || 0, icon: FiBook, color: "bg-purple-500" },
    { label: "Testimonials", value: stats?.totalTestimonials || 0, icon: FiStar, color: "bg-pink-500" },
    { label: "Unread Messages", value: stats?.unreadMessages || 0, icon: FiMessageSquare, color: "bg-red-500" },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${card.color} text-white`}>
                <card.icon size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-gray-500 text-sm">{card.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Messages */}
      {stats?.recentMessages?.length > 0 && (
        <div className="card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold">Recent Messages</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {stats.recentMessages.map((msg) => (
              <div
                key={msg._id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{msg.name}</p>
                    <p className="text-sm text-gray-500">{msg.email}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
