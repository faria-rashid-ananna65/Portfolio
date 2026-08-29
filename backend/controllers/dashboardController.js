import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Blog from "../models/Blog.js";
import Certificate from "../models/Certificate.js";
import Testimonial from "../models/Testimonial.js";
import Message from "../models/Message.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalProjects,
      totalSkills,
      totalBlogs,
      totalCertificates,
      totalTestimonials,
      unreadMessages,
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Blog.countDocuments(),
      Certificate.countDocuments(),
      Testimonial.countDocuments(),
      Message.countDocuments({ isRead: false }),
    ]);

    const recentMessages = await Message.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        totalSkills,
        totalBlogs,
        totalCertificates,
        totalTestimonials,
        unreadMessages,
        recentMessages,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
