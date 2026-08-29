import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiUser,
  FiSettings,
  FiBriefcase,
  FiCode,
  FiMessageSquare,
  FiBook,
  FiStar,
  FiMail,
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { connectSocket, disconnectSocket } from "../../services/socket";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin/dashboard", icon: FiHome },
  { name: "Profile", path: "/admin/profile", icon: FiUser },
  { name: "Skills", path: "/admin/skills", icon: FiCode },
  { name: "Projects", path: "/admin/projects", icon: FiBriefcase },
  { name: "Experience", path: "/admin/experience", icon: FiSettings },
  { name: "Blogs", path: "/admin/blogs", icon: FiBook },
  { name: "Testimonials", path: "/admin/testimonials", icon: FiStar },
  { name: "Messages", path: "/admin/messages", icon: FiMessageSquare },
  { name: "Settings", path: "/admin/settings", icon: FiSettings },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const socket = connectSocket();
    socket.on("newMessage", () => {
      setUnreadCount((prev) => prev + 1);
    });
    return () => {
      disconnectSocket();
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
          <Link to="/admin/dashboard" className="text-xl font-bold gradient-text">
            Admin
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <link.icon size={18} />
                {link.name}
                {link.name === "Messages" && unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <FiMenu size={20} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <Link
              to="/"
              target="_blank"
              className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              View Site
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-semibold">
                {admin?.email?.[0]?.toUpperCase() || "A"}
              </div>
              <span className="hidden sm:inline">{admin?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
