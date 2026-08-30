import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";
import Profile from "./models/Profile.js";
import Skill from "./models/Skill.js";
import Experience from "./models/Experience.js";
import Blog from "./models/Blog.js";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import skillsRoutes from "./routes/skills.js";
import projectsRoutes from "./routes/projects.js";
import experiencesRoutes from "./routes/experiences.js";
import blogsRoutes from "./routes/blogs.js";
import certificatesRoutes from "./routes/certificates.js";
import testimonialsRoutes from "./routes/testimonials.js";
import messagesRoutes from "./routes/messages.js";
import settingsRoutes from "./routes/settings.js";
import uploadRoutes from "./routes/upload.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();
connectDB().then(async () => {
  try {
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      });
      console.log("Admin account created automatically");
    }

    const profileExists = await Profile.findOne();
    if (!profileExists) {
      console.log("No profile found, seeding default data...");
      const { default: seedData } = await import("./seeds/seedData.js");
      await seedData();
      console.log("Default data seeded!");
    }
  } catch (err) {
    console.error("Auto-seed error:", err.message);
  }
});

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
});

app.set("io", io);

const corsOrigin = process.env.CLIENT_URL || "http://localhost:3000";
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.join("portfolio");
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/experiences", experiencesRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/certificates", certificatesRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.get("/api/seed", async (req, res) => {
  try {
    const { default: seedData } = await import("./seeds/seedData.js");
    await seedData();
    res.json({ success: true, message: "Data seeded successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ success: false, message: "File too large. Max size: 20MB" });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ success: false, message: "Too many files. Max: 5" });
    }
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err.message && err.message.includes("File type not supported")) {
    return res.status(400).json({ success: false, message: err.message });
  }
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, server, io };
