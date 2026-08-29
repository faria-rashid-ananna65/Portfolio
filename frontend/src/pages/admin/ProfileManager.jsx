import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSave, FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../../services/api";

const ProfileManager = () => {
  const [profile, setProfile] = useState({
    name: "",
    jobTitle: "",
    shortIntro: "",
    bio: "",
    careerObjective: "",
    email: "",
    phone: "",
    location: "",
    profileImage: "",
    coverImage: "",
    resume: "",
    socialLinks: { github: "", linkedin: "", facebook: "", twitter: "", instagram: "", youtube: "" },
    education: [],
    softSkills: [],
    languages: [],
    interests: [],
    typingTexts: [],
    heroTitle: "",
    heroSubtitle: "",
    stats: { projectsCompleted: 0, technologies: 0, yearsLearning: 0, happyClients: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/profile");
        if (data.data) setProfile(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await API.put("/profile", profile);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const addEducation = () => {
    setProfile({
      ...profile,
      education: [
        ...profile.education,
        { institution: "", degree: "", field: "", startDate: "", endDate: "", description: "" },
      ],
    });
  };

  const removeEducation = (i) => {
    setProfile({
      ...profile,
      education: profile.education.filter((_, idx) => idx !== i),
    });
  };

  const updateEducation = (i, field, value) => {
    const updated = [...profile.education];
    updated[i][field] = value;
    setProfile({ ...profile, education: updated });
  };

  if (loading) {
    return <div className="card p-8 animate-pulse h-96" />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Basic Information</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={profile.jobTitle}
            onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
            className="input-field"
          />
          <textarea
            placeholder="Short Intro"
            value={profile.shortIntro}
            onChange={(e) => setProfile({ ...profile, shortIntro: e.target.value })}
            className="textarea-field"
            rows={3}
          />
          <textarea
            placeholder="Biography"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="textarea-field"
            rows={5}
          />
          <textarea
            placeholder="Career Objective"
            value={profile.careerObjective}
            onChange={(e) => setProfile({ ...profile, careerObjective: e.target.value })}
            className="textarea-field"
            rows={3}
          />
        </div>

        {/* Contact & Social */}
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Contact & Social</h2>
          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Phone"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Location"
            value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            className="input-field"
          />
          <input
            type="url"
            placeholder="GitHub URL"
            value={profile.socialLinks.github}
            onChange={(e) =>
              setProfile({ ...profile, socialLinks: { ...profile.socialLinks, github: e.target.value } })
            }
            className="input-field"
          />
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={profile.socialLinks.linkedin}
            onChange={(e) =>
              setProfile({ ...profile, socialLinks: { ...profile.socialLinks, linkedin: e.target.value } })
            }
            className="input-field"
          />
          <input
            type="url"
            placeholder="Facebook URL"
            value={profile.socialLinks.facebook}
            onChange={(e) =>
              setProfile({ ...profile, socialLinks: { ...profile.socialLinks, facebook: e.target.value } })
            }
            className="input-field"
          />
          <input
            type="url"
            placeholder="Twitter URL"
            value={profile.socialLinks.twitter}
            onChange={(e) =>
              setProfile({ ...profile, socialLinks: { ...profile.socialLinks, twitter: e.target.value } })
            }
            className="input-field"
          />
        </div>

        {/* Media */}
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Media</h2>
          <input
            type="url"
            placeholder="Profile Image URL"
            value={profile.profileImage}
            onChange={(e) => setProfile({ ...profile, profileImage: e.target.value })}
            className="input-field"
          />
          {profile.profileImage && (
            <img src={profile.profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
          )}
          <input
            type="url"
            placeholder="Cover Image URL"
            value={profile.coverImage}
            onChange={(e) => setProfile({ ...profile, coverImage: e.target.value })}
            className="input-field"
          />
          <input
            type="url"
            placeholder="Resume URL"
            value={profile.resume}
            onChange={(e) => setProfile({ ...profile, resume: e.target.value })}
            className="input-field"
          />
        </div>

        {/* Stats */}
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Statistics</h2>
          <input
            type="number"
            placeholder="Projects Completed"
            value={profile.stats?.projectsCompleted}
            onChange={(e) =>
              setProfile({ ...profile, stats: { ...profile.stats, projectsCompleted: Number(e.target.value) } })
            }
            className="input-field"
          />
          <input
            type="number"
            placeholder="Technologies"
            value={profile.stats?.technologies}
            onChange={(e) =>
              setProfile({ ...profile, stats: { ...profile.stats, technologies: Number(e.target.value) } })
            }
            className="input-field"
          />
          <input
            type="number"
            placeholder="Years Learning"
            value={profile.stats?.yearsLearning}
            onChange={(e) =>
              setProfile({ ...profile, stats: { ...profile.stats, yearsLearning: Number(e.target.value) } })
            }
            className="input-field"
          />
          <input
            type="number"
            placeholder="Happy Clients"
            value={profile.stats?.happyClients}
            onChange={(e) =>
              setProfile({ ...profile, stats: { ...profile.stats, happyClients: Number(e.target.value) } })
            }
            className="input-field"
          />
        </div>

        {/* Education */}
        <div className="card p-6 space-y-4 lg:col-span-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Education</h2>
            <button onClick={addEducation} className="btn-primary btn-sm">
              + Add
            </button>
          </div>
          {profile.education?.map((edu, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <input
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => updateEducation(i, "institution", e.target.value)}
                className="input-field"
              />
              <input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(i, "degree", e.target.value)}
                className="input-field"
              />
              <input
                placeholder="Field"
                value={edu.field}
                onChange={(e) => updateEducation(i, "field", e.target.value)}
                className="input-field"
              />
              <div className="flex gap-2">
                <input
                  placeholder="Start"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(i, "startDate", e.target.value)}
                  className="input-field"
                />
                <input
                  placeholder="End"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(i, "endDate", e.target.value)}
                  className="input-field"
                />
              </div>
              <textarea
                placeholder="Description"
                value={edu.description}
                onChange={(e) => updateEducation(i, "description", e.target.value)}
                className="textarea-field md:col-span-2"
                rows={2}
              />
              <button
                onClick={() => removeEducation(i)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Typing Texts & Soft Skills */}
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Typing Texts</h2>
          <textarea
            placeholder="Typing texts (one per line)"
            value={profile.typingTexts?.join("\n")}
            onChange={(e) =>
              setProfile({ ...profile, typingTexts: e.target.value.split("\n").filter(Boolean) })
            }
            className="textarea-field"
            rows={4}
          />
          <h2 className="text-lg font-semibold mt-4">Soft Skills</h2>
          <textarea
            placeholder="Soft skills (one per line)"
            value={profile.softSkills?.join("\n")}
            onChange={(e) =>
              setProfile({ ...profile, softSkills: e.target.value.split("\n").filter(Boolean) })
            }
            className="textarea-field"
            rows={4}
          />
          <h2 className="text-lg font-semibold mt-4">Interests</h2>
          <textarea
            placeholder="Interests (one per line)"
            value={profile.interests?.join("\n")}
            onChange={(e) =>
              setProfile({ ...profile, interests: e.target.value.split("\n").filter(Boolean) })
            }
            className="textarea-field"
            rows={3}
          />
        </div>

        {/* Languages */}
        <div className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Languages</h2>
          {profile.languages?.map((lang, i) => (
            <div key={i} className="flex gap-2">
              <input
                placeholder="Language"
                value={lang.name}
                onChange={(e) => {
                  const updated = [...profile.languages];
                  updated[i].name = e.target.value;
                  setProfile({ ...profile, languages: updated });
                }}
                className="input-field"
              />
              <input
                placeholder="Level"
                value={lang.level}
                onChange={(e) => {
                  const updated = [...profile.languages];
                  updated[i].level = e.target.value;
                  setProfile({ ...profile, languages: updated });
                }}
                className="input-field"
              />
              <button
                onClick={() =>
                  setProfile({ ...profile, languages: profile.languages.filter((_, idx) => idx !== i) })
                }
                className="text-red-500"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setProfile({ ...profile, languages: [...(profile.languages || []), { name: "", level: "" }] })
            }
            className="text-primary-600 text-sm hover:underline"
          >
            + Add Language
          </button>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="btn-primary flex items-center gap-2"
      >
        <FiSave /> {saving ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
};

export default ProfileManager;
