# 🚀 Social Media Backend API

### Scalable Production-Ready Backend using Node.js, Express, MongoDB & TypeScript

---

# 🌍 Overview

A professionally structured and scalable social media backend built with modern backend engineering practices.

This project focuses on:

- Clean Architecture
- Scalability
- Security
- Reusable Components
- Real-world API Design
- Performance Optimization
- Industry-level Backend Patterns

The backend is designed similar to architectures used in large-scale applications like:

- Instagram
- Twitter/X
- LinkedIn
- Threads

---

# ⚡ Tech Stack

## 🖥️ Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

---

## 🔐 Authentication & Security

- JWT Authentication
- bcryptjs Password Hashing
- Protected Routes
- Ownership Authorization
- Zod Validation

---

## 🧠 Backend Architecture

- Controller Layer
- Service Layer
- Middleware Layer
- Validation Layer
- Utility Layer

---

# 📂 Project Structure

```bash
server/
│
├── src/
│   │
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── validators/
│   ├── utils/
│   ├── types/
│   ├── db/
│   │
│   └── app.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🧱 Architecture Flow

```text
Client Request
      ↓
Validation Middleware
      ↓
Authentication Middleware
      ↓
Controller
      ↓
Service Layer
      ↓
Database Layer
      ↓
Response
```

---

# ✨ Features Implemented

# ✅ Authentication System

- User Registration
- User Login
- JWT Token Generation
- Protected Routes
- Password Hashing

---

# ✅ Post System

- Create Post
- Update Post
- Delete Post
- Get Single Post
- Feed API
- Ownership Validation

---

# ✅ Like System

- Like Post
- Unlike Post
- Duplicate Like Prevention

---

# ✅ Comment System

- Add Comment
- Delete Comment
- Get Post Comments

---

# ✅ Follow System

- Follow User
- Unfollow User
- Get Followers
- Get Following

---

# ✅ Validation System (Zod)

Industry-level validation architecture:

- Body Validation
- Params Validation
- Query Validation
- MongoDB ObjectId Validation
- Pagination Validation
- Structured Error Responses

---

# ✅ Pagination + Search + Sorting

Implemented reusable utilities for:

- Pagination
- Search
- Sorting

---

# 🔍 Example Query

```bash
/api/posts/feed?page=1&limit=10&sort=latest&search=mern
```

---

# 📦 API Response Standardization

## Success Response

```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {}
}
```

---

## Validation Error Response

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    {
      "field": "body.email",
      "message": "Invalid email address"
    }
  ]
}
```

---

## Server Error Response

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

# 🧠 Database Design Philosophy

This backend avoids large embedded arrays for scalability.

Instead of:

```js
post.likes = [];
user.followers = [];
```

Separate collections are used:

- Like Collection
- Follow Collection
- Comment Collection

This prevents MongoDB document growth issues.

---

# 📊 Database Models

## 👤 User

- username
- email
- password
- bio
- profileImage

---

## 📝 Post

- content
- image
- owner
- likeCount
- commentCount

---

## ❤️ Like

- post
- likedBy

---

## 💬 Comment

- content
- post
- commentedBy

---

## 👥 Follow

- follower
- following

---

# ⚡ Performance Optimizations

# ✅ Pagination

Implemented paginated APIs to avoid loading massive datasets.

---

# ✅ Indexing

MongoDB indexes added for:

- Feed Queries
- Follow Queries
- Like Queries

---

# ✅ Denormalization

Counts stored directly inside documents:

```js
likeCount;
commentCount;
```

This reduces expensive aggregation queries.

---

# 🔐 Security Features

## Implemented

- Password Hashing
- JWT Authentication
- Protected Routes
- Ownership Checks
- Request Validation

---

## Planned Security Improvements

- Helmet
- Rate Limiting
- MongoDB Injection Protection
- XSS Protection
- Secure HTTP Headers
- Refresh Tokens
- Logging System

---

# 🧪 Example API Endpoints

# 🔐 Auth

```http
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
```

---

# 📝 Posts

```http
POST   /api/posts/create
GET    /api/posts/feed
GET    /api/posts/:postId
PUT    /api/posts/:postId
DELETE /api/posts/:postId
```

---

# ❤️ Likes

```http
POST   /api/likes/:postId
DELETE /api/likes/:postId
```

---

# 💬 Comments

```http
POST   /api/comments/:postId
GET    /api/comments/:postId
DELETE /api/comments/:commentId
```

---

# 👥 Follow

```http
POST   /api/follow/:userId
DELETE /api/follow/:userId
GET    /api/follow/followers/:userId
GET    /api/follow/following/:userId
```

---

# 🚀 Getting Started

# 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

---

# 2️⃣ Install Dependencies

```bash
npm install
```

---

# 3️⃣ Setup Environment Variables

Create `.env`

```env
PORT=3000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

---

# 4️⃣ Run Development Server

```bash
npm run dev
```

---

# 🧠 Current Backend Level

✅ Scalable Architecture | ✅ Reusable Middleware | ✅ Production-style Validation | ✅ Service Layer Pattern | ✅ Pagination Utilities | ✅ Error Handling System | ✅ Protected APIs | ✅ MongoDB Relationship Modeling

This is beyond beginner-level backend development.

---

# 📌 Upcoming Features

- Media Uploads (Cloudinary)
- Notifications
- Redis Caching
- Real-time Chat
- WebSockets
- AI Feed Ranking
- Admin Dashboard
- Microservices Migration
- Docker Deployment
- CI/CD Pipeline

---

# 👨‍💻 Author

## Bhanu Pratap Patkar

Backend Developer | MERN Stack Developer

GitHub:
[Bppatkar GitHub](https://github.com/Bppatkar?utm_source=chatgpt.com)

---

# ⭐ Project Goal

The goal of this project is to deeply understand:

- Backend Engineering
- Scalable System Design
- API Architecture
- Database Modeling
- Production-level Development

instead of only building tutorial-level CRUD applications.

---
