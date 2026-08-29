import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const publicPages = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/skills", name: "Skills" },
  { path: "/projects", name: "Projects" },
  { path: "/experience", name: "Experience" },
  { path: "/blog", name: "Blog" },
  { path: "/contact", name: "Contact" },
];

const PageNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const currentIndex = publicPages.findIndex(
    (p) => p.path === currentPath || currentPath.startsWith(p.path + "/")
  );

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? publicPages[currentIndex - 1] : null;
  const next =
    currentIndex < publicPages.length - 1
      ? publicPages[currentIndex + 1]
      : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center">
        {prev ? (
          <Link
            to={prev.path}
            className="group flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <div>
              <p className="text-xs text-gray-400">Previous</p>
              <p className="font-semibold">{prev.name}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            to={next.path}
            className="group flex items-center gap-3 text-right text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <div>
              <p className="text-xs text-gray-400">Next</p>
              <p className="font-semibold">{next.name}</p>
            </div>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default PageNav;
