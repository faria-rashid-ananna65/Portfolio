import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import API from "../../services/api";
import SEO from "../../components/common/SEO";
import SectionTitle from "../../components/common/SectionTitle";
import Skeleton from "../../components/common/Skeleton";

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/profile");
        setProfile(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto">
        <Skeleton className="h-12 w-64 mx-auto mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title={`About ${profile?.name || "Developer"} - Biography & Education`}
        description={`Learn about ${profile?.name || "developer"}'s background, education, skills, and career objectives. ${profile?.bio?.substring(0, 100) || ""}`}
        keywords={`about ${profile?.name || "developer"}, biography, education, skills, career, developer portfolio`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="About Me" subtitle="Get to know me better" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-4">Biography</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {profile?.bio || "No biography added yet."}
              </p>
            </div>

            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-4">Career Objective</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {profile?.careerObjective || "No career objective added yet."}
              </p>
            </div>

            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FiMail className="text-primary-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {profile?.email || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="text-primary-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {profile?.phone || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-primary-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {profile?.location || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Education */}
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-6">Education</h3>
              <div className="space-y-6">
                {profile?.education?.length > 0 ? (
                  profile.education.map((edu, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-primary-500 pl-4 relative"
                    >
                      <div className="absolute -left-2 top-0 w-3 h-3 bg-primary-500 rounded-full" />
                      <h4 className="font-semibold">{edu.degree} in {edu.field}</h4>
                      <p className="text-primary-600 text-sm">{edu.institution}</p>
                      <p className="text-gray-500 text-sm">
                        {edu.startDate} - {edu.endDate || "Present"}
                      </p>
                      {edu.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No education added yet.</p>
                )}
              </div>
            </div>

            {/* Soft Skills */}
            {profile?.softSkills?.length > 0 && (
              <div className="card p-8">
                <h3 className="text-2xl font-bold mb-6">Soft Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {profile.softSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {profile?.languages?.length > 0 && (
              <div className="card p-8">
                <h3 className="text-2xl font-bold mb-6">Languages</h3>
                <div className="space-y-4">
                  {profile.languages.map((lang, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-gray-500 text-sm">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interests */}
            {profile?.interests?.length > 0 && (
              <div className="card p-8">
                <h3 className="text-2xl font-bold mb-6">Interests</h3>
                <div className="flex flex-wrap gap-3">
                  {profile.interests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile?.resume && (
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <FiDownload /> Download Resume
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
