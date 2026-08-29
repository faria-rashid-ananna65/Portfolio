import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiChevronRight, FiHome } from "react-icons/fi";

const breadcrumbNameMap = {
  "/": "Home",
  "/about": "About",
  "/skills": "Skills",
  "/projects": "Projects",
  "/experience": "Experience",
  "/blog": "Blog",
  "/contact": "Contact",
  "/admin": "Dashboard",
  "/admin/dashboard": "Dashboard",
  "/admin/profile": "Profile",
  "/admin/skills": "Skills",
  "/admin/projects": "Projects",
  "/admin/experience": "Experience",
  "/admin/blogs": "Blogs",
  "/admin/testimonials": "Testimonials",
  "/admin/messages": "Messages",
  "/admin/settings": "Settings",
  "/admin/login": "Login",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (location.pathname === "/") return null;

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-2"
    >
      <ol className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
        <li>
          <Link
            to={isAdmin ? "/admin/dashboard" : "/"}
            className="hover:text-primary-500 transition-colors flex items-center gap-1"
          >
            <FiHome size={14} />
            <span>Home</span>
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;
          const displayName = breadcrumbNameMap[routeTo] || name.charAt(0).toUpperCase() + name.slice(1);

          return (
            <li key={routeTo} className="flex items-center gap-1">
              <FiChevronRight size={14} />
              {isLast ? (
                <span className="text-gray-900 dark:text-white font-medium">
                  {displayName}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:text-primary-500 transition-colors"
                >
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
};

export default Breadcrumbs;
