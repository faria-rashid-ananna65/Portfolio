import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: "" },
    percentage: { type: Number, default: 0, min: 0, max: 100 },
    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Database", "Authentication", "Tools", "Other"],
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
