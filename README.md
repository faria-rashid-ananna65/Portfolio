# Faria WebDev - MERN Developer Portfolio

A full-stack developer portfolio by Faria WebDev built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features a complete admin dashboard with CMS capabilities, real-time notifications, and premium UI/UX.

## Tech Stack

**Frontend:** React.js, React Router DOM, Tailwind CSS, Framer Motion, Axios, React Icons, Lucide React, Socket.io Client

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, cookie-parser, Socket.io, ImageKit, Multer

## Features

### Public Website
- Responsive navbar with active link highlighting
- Hero section with typing animation and stats
- About section with bio, education, skills
- Skills page with category filtering and animated progress bars
- Projects page with search, filter, and detail view
- Experience timeline
- Certificate gallery
- Blog with search and categories
- Contact form with real-time admin notification
- Dark/Light theme toggle

### Admin Dashboard
- Secure JWT authentication with cookie-based sessions
- Dashboard with analytics and recent activity
- Full CRUD management for all sections:
  - Profile (bio, contact, social links, stats, education)
  - Skills (icon, percentage, category)
  - Projects (images, tech stack, features, links)
  - Experience (timeline)
  - Blogs (rich content, categories, tags, publish/draft)
  - Certificates (image, PDF, credentials)
  - Testimonials (rating, feedback)
  - Messages (read/unread, search, real-time)
  - Website settings (SEO, theme, analytics)
- Real-time Socket.io notifications for new messages

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- ImageKit account (optional, for image uploads)

### Installation

```bash
# Clone repository
git clone <repo-url>
cd portfolio

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed default admin
npm run seed

# Start backend
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm start
```

### Default Admin Credentials
```
Email: fariarashid76@gmail.com
Password: faria123
```

### Environment Variables

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url
CLIENT_URL=http://localhost:3000
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | No | Admin login |
| GET | /api/auth/me | Yes | Get current admin |
| GET | /api/profile | No | Get profile |
| PUT | /api/profile | Yes | Update profile |
| GET | /api/skills | No | Get skills |
| POST | /api/skills | Yes | Create skill |
| GET | /api/projects | No | Get projects |
| POST | /api/projects | Yes | Create project |
| GET | /api/experiences | No | Get experiences |
| POST | /api/blogs | Yes | Create blog |
| GET | /api/certificates | No | Get certificates |
| GET | /api/testimonials | No | Get testimonials |
| POST | /api/messages | No | Send message |
| GET | /api/messages | Yes | Get messages |
| GET | /api/settings | No | Get settings |
| PUT | /api/settings | Yes | Update settings |
| POST | /api/upload | Yes | Upload image |
| GET | /api/dashboard | Yes | Get dashboard stats |

## Folder Structure

```
portfolio/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeds/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   └── layout/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── public/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
│   └── tailwind.config.js
└── README.md
```

## License

MIT
