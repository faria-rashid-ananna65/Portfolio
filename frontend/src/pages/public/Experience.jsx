import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../../services/api";
import SEO from "../../components/common/SEO";
import SectionTitle from "../../components/common/SectionTitle";
import { CardSkeleton } from "../../components/common/Skeleton";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data } = await API.get("/experiences");
        setExperiences(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title="Work Experience - Professional Journey"
        description="Explore my professional work experience, career timeline, and the technologies I've worked with in various roles."
        keywords="work experience, professional journey, career, job history, developer experience"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Experience"
          subtitle="My professional journey"
        />

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-950 z-10" />

                <div className="flex-1 md:w-1/2" />
                <div className="flex-1 md:w-1/2 card p-6 ml-8 md:ml-0">
                  <span className="text-primary-600 text-sm font-semibold">
                    {exp.duration || `${exp.startDate} - ${exp.endDate || "Present"}`}
                  </span>
                  <h3 className="text-xl font-bold mt-1">{exp.position}</h3>
                  <p className="text-primary-500 font-medium">{exp.company}</p>
                  {exp.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                  {exp.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech, j) => (
                        <span
                          key={j}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {experiences.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No experiences added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;
