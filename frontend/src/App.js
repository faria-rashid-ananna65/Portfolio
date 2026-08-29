import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Breadcrumbs from "./components/common/Breadcrumbs";
import ScrollToTop from "./components/common/ScrollToTop";
import Loading from "./components/common/Loading";
import PageNav from "./components/common/PageNav";

const Home = lazy(() => import("./pages/public/Home"));
const About = lazy(() => import("./pages/public/About"));
const Skills = lazy(() => import("./pages/public/Skills"));
const Projects = lazy(() => import("./pages/public/Projects"));
const ProjectDetails = lazy(() => import("./pages/public/ProjectDetails"));
const Experience = lazy(() => import("./pages/public/Experience"));
const Blog = lazy(() => import("./pages/public/Blog"));
const BlogPost = lazy(() => import("./pages/public/BlogPost"));
const Contact = lazy(() => import("./pages/public/Contact"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ProfileManager = lazy(() => import("./pages/admin/ProfileManager"));
const SkillManager = lazy(() => import("./pages/admin/SkillManager"));
const ProjectManager = lazy(() => import("./pages/admin/ProjectManager"));
const ExperienceManager = lazy(() => import("./pages/admin/ExperienceManager"));
const BlogManager = lazy(() => import("./pages/admin/BlogManager"));
const TestimonialManager = lazy(() => import("./pages/admin/TestimonialManager"));
const MessageManager = lazy(() => import("./pages/admin/MessageManager"));
const SettingsManager = lazy(() => import("./pages/admin/SettingsManager"));

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  if (loading) return <Loading />;
  return admin ? children : <Navigate to="/admin/login" />;
};

const PublicLayout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <Navbar />
      {!isAdmin && <Breadcrumbs />}
      <div className="min-h-screen">{children}</div>
      {!isAdmin && <PageNav />}
      <Footer />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/skills" element={<PublicLayout><Skills /></PublicLayout>} />
              <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
              <Route path="/projects/:id" element={<PublicLayout><ProjectDetails /></PublicLayout>} />
              <Route path="/experience" element={<PublicLayout><Experience /></PublicLayout>} />
              <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
              <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

              <Route path="/admin/login" element={<PublicLayout><AdminLogin /></PublicLayout>} />
              <Route path="/admin" element={
                <ProtectedRoute><AdminLayout /></ProtectedRoute>
              }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<ProfileManager />} />
                <Route path="skills" element={<SkillManager />} />
                <Route path="projects" element={<ProjectManager />} />
                <Route path="experience" element={<ExperienceManager />} />
                <Route path="blogs" element={<BlogManager />} />
                <Route path="testimonials" element={<TestimonialManager />} />
                <Route path="messages" element={<MessageManager />} />
                <Route path="settings" element={<SettingsManager />} />
                <Route index element={<Navigate to="/admin/dashboard" />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
