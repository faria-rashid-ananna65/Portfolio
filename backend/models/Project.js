import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    images: [String],
    techStack: [String],
    category: {
      type: String,
      default: "All",
      enum: ["All", "React", "MERN", "Full Stack", "Socket.io"],
    },
    featured: { type: Boolean, default: false },
    liveLink: { type: String, default: "" },
    githubLink: { type: String, default: "" },
    features: [String],
    challenges: [String],
    learningOutcomes: [String],
    architecture: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

export default mongoose.model("Project", projectSchema);
