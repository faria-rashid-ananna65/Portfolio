import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    websiteName: { type: String, default: "Faria WebDev" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    themeColor: { type: String, default: "#6366f1" },
    footerText: { type: String, default: "" },
    seoTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: [String],
    ogImage: { type: String, default: "" },
    googleAnalyticsId: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
