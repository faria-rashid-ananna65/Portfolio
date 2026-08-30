import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiDownload,
  FiArrowDown,
} from "react-icons/fi";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import API from "../../services/api";
import SEO from "../../components/common/SEO";
import Skeleton from "../../components/common/Skeleton";
import SectionTitle from "../../components/common/SectionTitle";
import ProjectCard from "../../components/common/ProjectCard";
import TestimonialCard from "../../components/common/TestimonialCard";
import SkillCard from "../../components/common/SkillCard";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes, testimonialsRes, skillsRes] =
          await Promise.all([
            API.get("/profile"),
            API.get("/projects?featured=true"),
            API.get("/testimonials"),
            API.get("/skills"),
          ]);
        setProfile(profileRes.data.data);
        setProjects(projectsRes.data.data?.slice(0, 3) || []);
        setTestimonials(testimonialsRes.data.data || []);
        setSkills(skillsRes.data.data?.slice(0, 8) || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-buttons",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        ".hero-image",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: "back.out(1.7)" }
      );

      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".skill-item",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [loading]);

  const typingTexts = profile?.typingTexts?.length
    ? profile.typingTexts
    : ["Full Stack Developer", "React Developer", "MERN Stack Developer"];

  const [typingText, setTypingText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = typingTexts[textIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setTypingText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
          if (charIndex === currentText.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setTypingText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
          if (charIndex === 0) {
            setIsDeleting(false);
            setTextIndex((textIndex + 1) % typingTexts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, typingTexts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Skeleton className="h-96 w-full max-w-4xl" />
      </div>
    );
  }

  const stats = [
    { label: "Projects Completed", value: profile?.stats?.projectsCompleted || 0 },
    { label: "Technologies", value: profile?.stats?.technologies || 0 },
    { label: "Years Learning", value: profile?.stats?.yearsLearning || 0 },
    { label: "Happy Clients", value: profile?.stats?.happyClients || 0 },
  ];

  const socialIcons = { github: FaGithub, linkedin: FaLinkedin };

  return (
    <div>
      <SEO
        title={`${profile?.name || "Developer"} - Faria WebDev | Full Stack Developer`}
        description={`${profile?.shortIntro || "Professional developer portfolio by Faria WebDev showcasing projects, skills, and experience in modern web development."} ${profile?.bio?.substring(0, 150) || ""}`}
        keywords="Faria WebDev, web developer, frontend developer, React, JavaScript, full stack, MERN, developer"
        type="profile"
      />
      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 dark:bg-primary-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="hero-title text-primary-600 dark:text-primary-400 font-semibold mb-2">
                Hello, I&apos;m
              </p>
              <h1 className="hero-title text-4xl md:text-6xl font-bold mb-4">
                {profile?.name || "Your Name"}
              </h1>
              <div className="hero-subtitle text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-4 h-10">
                {typingText}
                <span className="animate-pulse text-primary-500">|</span>
              </div>
              <p className="hero-subtitle text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-lg">
                {profile?.shortIntro || "Passionate developer building amazing web experiences."}
              </p>
              <div className="hero-buttons flex flex-wrap gap-4 mb-8">
                <Link to="/contact" className="btn-primary flex items-center gap-2">
                  Hire Me
                </Link>
                {profile?.resume && (
                  <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2">
                    <FiDownload /> Download Resume
                  </a>
                )}
              </div>
              <div className="hero-buttons flex gap-4">
                {Object.entries(profile?.socialLinks || {}).map(([key, url]) => {
                  if (!url) return null;
                  const Icon = socialIcons[key];
                  return Icon ? (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white transition-all">
                      <Icon size={18} />
                    </a>
                  ) : null;
                })}
              </div>
            </div>

            <div className="hero-image flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-1 animate-glow">
                  <img src={profile?.profileImage || "https://via.placeholder.com/400"} alt={profile?.name || "Profile"} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-3xl animate-float">💻</div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl animate-float" style={{ animationDelay: "1s" }}>🚀</div>
              </div>
            </div>
          </div>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <FiArrowDown className="text-gray-400" size={24} />
        </motion.div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}+</div>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section ref={projectsRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Featured Projects" subtitle="Some of my recent work" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <div key={project._id} className="project-card">
                  <ProjectCard project={project} index={i} />
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/projects" className="btn-outline">View All Projects</Link>
            </div>
          </div>
        </section>
      )}

      {/* Skills Preview */}
      {skills.length > 0 && (
        <section ref={skillsRef} className="py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Skills" subtitle="Technologies I work with" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skills.map((skill, i) => (
                <div key={skill._id} className="skill-item">
                  <SkillCard skill={skill} index={i} />
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/skills" className="btn-outline">View All Skills</Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section ref={testimonialsRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Testimonials" subtitle="What people say about me" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((t, i) => (
                <div key={t._id} className="testimonial-card">
                  <TestimonialCard testimonial={t} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let&apos;s Work Together</h2>
            <p className="text-primary-100 text-lg mb-8">Have a project in mind? Let&apos;s discuss how I can help you.</p>
            <Link to="/contact" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
