import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import Blog from "../models/Blog.js";

const seedData = async () => {
  // Profile
  await Profile.deleteMany({});
  await Profile.create({
    name: "Faria Rashid",
    jobTitle: "MERN Stack Developer",
    shortIntro: "I build modern, responsive, full-stack web applications using the MERN stack.",
    bio: "I am a passionate MERN Stack Developer with a strong foundation in JavaScript, React, Node.js, Express, and MongoDB. I enjoy solving problems with code and creativity, and I am constantly learning new technologies to improve my skills. I focus on building clean, responsive, and user-friendly web applications.",
    careerObjective: "To grow as a developer by building real-world applications, learning modern technologies, and contributing to meaningful projects that solve real problems.",
    email: "fariarashid76@gmail.com",
    phone: "",
    location: "",
    socialLinks: {
      github: "https://github.com/faria-rashid-ananna65",
      linkedin: "https://www.linkedin.com/in/faria-rashid-ananna-a06839335",
    },
    education: [],
    softSkills: [
      "Problem Solving",
      "Quick Learning",
      "Communication",
      "Teamwork",
      "Time Management",
      "Adaptability",
      "Critical Thinking",
      "Attention to Detail",
      "Self-Motivation",
      "Debugging & Troubleshooting",
    ],
    languages: [],
    interests: [
      "Web Development",
      "Software Engineering",
      "Learning New Technologies",
      "Problem Solving",
      "Data Structures & Algorithms",
      "AI-Assisted Development",
      "Building Personal Projects",
      "Exploring Modern Web Technologies",
    ],
    typingTexts: [
      "I build modern web applications.",
      "I create responsive user experiences.",
      "I develop full-stack MERN applications.",
      "I solve problems with code and creativity.",
    ],
    heroTitle: "Faria Rashid",
    heroSubtitle: "MERN Stack Developer",
    stats: {
      projectsCompleted: 5,
      technologies: 15,
      yearsLearning: 2,
      happyClients: 0,
    },
  });

  // Skills
  await Skill.deleteMany({});
  await Skill.insertMany([
    { name: "React.js", category: "Frontend", percentage: 85, order: 1 },
    { name: "JavaScript (ES6+)", category: "Frontend", percentage: 85, order: 2 },
    { name: "HTML5", category: "Frontend", percentage: 90, order: 3 },
    { name: "CSS3", category: "Frontend", percentage: 85, order: 4 },
    { name: "Tailwind CSS", category: "Frontend", percentage: 85, order: 5 },
    { name: "React Router", category: "Frontend", percentage: 80, order: 6 },
    { name: "Axios", category: "Frontend", percentage: 80, order: 7 },
    { name: "Vite", category: "Frontend", percentage: 75, order: 8 },

    { name: "Node.js", category: "Backend", percentage: 80, order: 9 },
    { name: "Express.js", category: "Backend", percentage: 80, order: 10 },
    { name: "REST API", category: "Backend", percentage: 85, order: 11 },
    { name: "JWT", category: "Backend", percentage: 80, order: 12 },
    { name: "bcrypt", category: "Backend", percentage: 75, order: 13 },
    { name: "Cookie-based Authentication", category: "Backend", percentage: 75, order: 14 },
    { name: "Role-based Authorization", category: "Backend", percentage: 70, order: 15 },
    { name: "Socket.io", category: "Backend", percentage: 70, order: 16 },

    { name: "MongoDB", category: "Database & Services", percentage: 80, order: 17 },
    { name: "Mongoose", category: "Database & Services", percentage: 80, order: 18 },
    { name: "ImageKit", category: "Database & Services", percentage: 70, order: 19 },

    { name: "TypeScript", category: "Basic Knowledge", percentage: 40, order: 20 },
    { name: "Data Structures & Algorithms", category: "Basic Knowledge", percentage: 50, order: 21 },
    { name: "Git & GitHub", category: "Basic Knowledge", percentage: 75, order: 22 },
    { name: "Postman", category: "Basic Knowledge", percentage: 80, order: 23 },
  ]);

  // Experience
  await Experience.deleteMany({});
  await Experience.create({
    company: "Self-Learning & Project Development",
    position: "MERN Stack Developer — Personal Projects",
    duration: "Ongoing",
    startDate: "2023",
    endDate: "Present",
    description: [
      "Developed full-stack web applications using React, Node.js, Express, and MongoDB.",
      "Built REST APIs and connected frontend applications with backend services.",
      "Implemented JWT authentication and protected routes.",
      "Developed real-time communication features using Socket.io.",
      "Integrated ImageKit for image uploading.",
      "Created responsive interfaces using Tailwind CSS.",
      "Used Git and GitHub for version control.",
      "Used AI development tools for learning, debugging, and improving development workflow.",
    ].join("\n"),
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "ImageKit", "Tailwind CSS", "Git"],
    order: 1,
  });

  // Blogs
  await Blog.deleteMany({});
  await Blog.insertMany([
    {
      title: "What is the MERN Stack?",
      content: "<h2>Introduction</h2><p>The MERN stack is one of the most popular technology stacks for building modern web applications. It consists of four powerful technologies that work together seamlessly.</p><h2>M — MongoDB</h2><p>MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. Unlike traditional relational databases, MongoDB allows you to work with data in a more natural and intuitive way.</p><h2>E — Express.js</h2><p>Express.js is a minimal and flexible Node.js web application framework. It provides a robust set of features for building web and mobile applications.</p><h2>R — React.js</h2><p>React is a JavaScript library for building user interfaces. Developed by Facebook, React allows developers to create reusable UI components and manage application state efficiently.</p><h2>N — Node.js</h2><p>Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows developers to run JavaScript on the server side, enabling full-stack JavaScript development.</p><h2>Why Choose MERN?</h2><ul><li>Full-stack JavaScript</li><li>Large community and ecosystem</li><li>High performance and scalability</li><li>Great for building RESTful APIs</li></ul>",
      excerpt: "A beginner-friendly explanation of MongoDB, Express.js, React.js, and Node.js and how they work together.",
      category: "MERN Stack",
      tags: ["MERN", "MongoDB", "Express", "React", "Node.js"],
      status: "published",
      readingTime: 5,
    },
    {
      title: "JWT Authentication in MERN",
      content: "<h2>What is JWT?</h2><p>JSON Web Token (JWT) is an open standard for securely transmitting information between two parties as a JSON object.</p><h2>How JWT Authentication Works</h2><ol><li>User sends credentials to the server</li><li>Server validates and generates a JWT token</li><li>Token is sent back to the client</li><li>Client sends token with every request</li><li>Server verifies and grants access</li></ol><h2>Best Practices</h2><ul><li>Use HTTP-only cookies for token storage</li><li>Set appropriate expiration times</li><li>Implement token refresh mechanisms</li><li>Always use HTTPS in production</li></ul>",
      excerpt: "Understanding how authentication works between a React frontend and Node.js/Express backend.",
      category: "Authentication",
      tags: ["JWT", "Authentication", "Security", "MERN"],
      status: "published",
      readingTime: 7,
    },
    {
      title: "Building Real-Time Chat with Socket.io",
      content: "<h2>Introduction</h2><p>Real-time communication is a key feature of many modern applications. Socket.io makes it easy to add real-time capabilities to web applications.</p><h2>What is Socket.io?</h2><p>Socket.io is a JavaScript library that enables real-time, bidirectional, and event-based communication between the browser and the server.</p><h2>Key Concepts</h2><ul><li><strong>Events:</strong> Custom actions that can be emitted and listened to</li><li><strong>Rooms:</strong> Logical channels for grouping users</li><li><strong>Broadcasting:</strong> Sending messages to all connected clients</li></ul><h2>Conclusion</h2><p>Socket.io provides a powerful API for building real-time features in MERN stack applications.</p>",
      excerpt: "How WebSocket-based communication can be used to create real-time messaging applications.",
      category: "Real-Time",
      tags: ["Socket.io", "WebSocket", "Real-Time", "Chat"],
      status: "published",
      readingTime: 6,
    },
    {
      title: "What I Learned Building My First MERN Application",
      content: "<h2>The Journey Begins</h2><p>Building my first full-stack MERN application was an incredible learning experience.</p><h2>Key Lessons</h2><p><strong>1. API Design Matters</strong> — Planning endpoints before coding makes everything easier.</p><p><strong>2. MongoDB is Flexible</strong> — Document-based approach simplifies data modeling.</p><p><strong>3. Authentication is More Than Login</strong> — Token refresh, protected routes, and secure storage all matter.</p><p><strong>4. Debugging is a Skill</strong> — Reading error messages and using dev tools systematically is invaluable.</p><p><strong>5. Deployment Teaches You a Lot</strong> — Environment variables, CORS, and production debugging are real skills.</p>",
      excerpt: "Lessons learned about APIs, MongoDB, authentication, frontend state, debugging, and deployment.",
      category: "Learning",
      tags: ["MERN", "Learning", "Web Development", "Personal Growth"],
      status: "published",
      readingTime: 6,
    },
  ]);
};

export default seedData;
