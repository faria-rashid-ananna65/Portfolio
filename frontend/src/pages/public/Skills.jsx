import { useState, useEffect } from "react";
import API from "../../services/api";
import SEO from "../../components/common/SEO";
import SectionTitle from "../../components/common/SectionTitle";
import SkillCard from "../../components/common/SkillCard";
import { SkillSkeleton } from "../../components/common/Skeleton";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [groupedSkills, setGroupedSkills] = useState({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Database",
    "Authentication",
    "Tools",
    "Other",
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await API.get("/skills");
        setSkills(data.data || []);
        const grouped = {};
        data.data?.forEach((skill) => {
          if (!grouped[skill.category]) grouped[skill.category] = [];
          grouped[skill.category].push(skill);
        });
        setGroupedSkills(grouped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkillSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title="Skills - Frontend, Backend, Database & Tools"
        description="Explore my technical skills in Frontend, Backend, Database, Authentication, and Development Tools including React, Node.js, MongoDB, and more."
        keywords="web developer skills, frontend skills, backend skills, React, Node.js, MongoDB, JavaScript, programming"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="My Skills" subtitle="Technologies I work with" />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, i) => (
            <SkillCard key={skill._id} skill={skill} index={i} />
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No skills found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
