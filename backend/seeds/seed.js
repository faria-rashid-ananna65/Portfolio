import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import seedData from "./seedData.js";

dotenv.config();

const seedAll = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected for seeding...");

    await Admin.deleteMany({});
    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
    console.log("Admin seeded!");

    await seedData();
    console.log("All data seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedAll();
