import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    jobTitle: { type: String, default: "" },
    shortIntro: { type: String, default: "" },
    bio: { type: String, default: "" },
    careerObjective: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    resume: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
    education: [
      {
        institution: String,
        degree: String,
        field: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    softSkills: [String],
    languages: [
      {
        name: String,
        level: String,
      },
    ],
    interests: [String],
    typingTexts: [String],
    heroTitle: { type: String, default: "" },
    heroSubtitle: { type: String, default: "" },
    heroBackground: { type: String, default: "" },
    stats: {
      projectsCompleted: { type: Number, default: 0 },
      technologies: { type: Number, default: 0 },
      yearsLearning: { type: Number, default: 0 },
      happyClients: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
