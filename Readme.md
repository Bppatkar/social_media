# 🚀 Social Media Backend API

### Production-Style Scalable Backend using Node.js, Express, MongoDB & TypeScript

---

# 🌍 Overview

A professionally structured and scalable social media backend built with modern backend engineering practices.

This project focuses heavily on:

- Scalable Architecture
- Backend Engineering Principles
- Security
- Performance Optimization
- Reusable Backend Patterns
- Clean Code Organization
- Real-world API Design

The architecture and database design are inspired by production-scale applications such as:

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
- Protected Routes
- Ownership Authorization
- Helmet Security
- Rate Limiting
- HPP Protection
- MongoDB Injection Protection
- Secure Error Responses

---

## ✅ Validation

- Zod v4 Validation
- Request Validation Middleware
- Params Validation
- Query Validation
- MongoDB ObjectId Validation

---

## 🧠 Backend Architecture

- Controller Layer
- Service Layer
- Middleware Layer
- Validation Layer
- Utility Layer
- Centralized Error Handling

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
Security Middleware
      ↓
Validation Middleware
      ↓
Authentication Middleware
      ↓
Controller Layer
      ↓
Service Layer
      ↓
Database Layer
      ↓
Centralized Response
```

---

# 🧠 Backend Engineering Concepts Applied

This project focuses on real backend engineering concepts instead of only CRUD development.

Implemented concepts include:

- Layered Architecture
- Separation of Concerns
- Centralized Error Handling
- Validation Architecture
- Scalable MongoDB Relationship Modeling
- Reusable Middleware Design
- Production-style API Responses
- Token-based Authentication
- Pagination Architecture
- Search & Sorting Utilities
- Denormalization Concepts
- Indexing Strategies

---

# ✨ Features Implemented

# ✅ Authentication System

- User Registration
- User Login
- User Logout
- JWT Token Generation
- Protected Routes
- Authentication Middleware
- Current User Endpoint (`/auth/me`)

---

# ✅ Post System

- Create Post
- Update Post
- Delete Post
- Get Single Post
- Feed API
- Pagination
- Search
- Sorting
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
- Self-follow Prevention

---

# ✅ Validation System (Zod)

Industry-level validation architecture:

- Body Validation
- Params Validation
- Query Validation
- Pagination Validation
- MongoDB ObjectId Validation
- Structured Validation Errors

---

# 🔍 Example Validation Error Response

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

# ✅ Pagination + Search + Sorting

Reusable utilities implemented for:

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

## ✅ Success Response

```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {}
}
```

---

## ❌ Validation Error Response

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

## ❌ Server Error Response

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

# 🧠 Database Design Philosophy

This backend avoids storing massive embedded arrays inside documents.

Instead of:

```js
post.likes = [];
user.followers = [];
```

Separate scalable collections are used:

- Like Collection
- Follow Collection
- Comment Collection

This prevents:

- Huge MongoDB document growth
- Large array update problems
- Performance degradation

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

Paginated APIs implemented to avoid loading massive datasets into memory.

---

# ✅ Indexing

MongoDB indexes added for:

- Feed Queries
- Follow Queries
- Like Queries
- Search Operations

---

# ✅ Denormalization

Counts stored directly inside documents:

```js
likeCount;
commentCount;
```

This reduces expensive aggregation operations.

---

# 🔐 Security Features

## ✅ Implemented Security Stack

- Helmet Security Headers
- Rate Limiting
- HTTP Parameter Pollution Protection (HPP)
- MongoDB Injection Protection
- JWT Authentication
- Protected Routes
- Ownership Authorization
- Secure Error Responses

---

# 🧪 Example API Endpoints

# 🔐 Auth

```http
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
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

JWT_ACCESS_SECRET=your_secret_key
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d
```

---

# 4️⃣ Run Development Server

```bash
npm run dev
```

---

# 🧠 Current Backend Level

This project is no longer a beginner CRUD application.

Current backend engineering concepts implemented:

✅ Layered Architecture
✅ Reusable Middleware
✅ Production-style Validation
✅ Service Layer Pattern
✅ Centralized Error Handling
✅ Pagination Utilities
✅ Search & Sorting Utilities
✅ JWT Authentication
✅ Scalable MongoDB Relationships
✅ Security Middleware Integration

---

# 🚀 Upcoming Backend Engineering Features

## 🔐 Authentication & Security

- Refresh Token System
- HTTP-only Cookie Authentication
- RBAC (Role Based Access Control)
- Session Management
- Advanced Security Hardening

---

## ⚡ Infrastructure & Scalability

- Redis Caching
- Feed Optimization
- Request Logging & Monitoring
- Queue Systems

---

## 📦 Media & Realtime

- Multer File Uploads
- Cloudinary Integration
- WebSockets
- Real-time Notifications
- Live Chat System

---

## 🚀 DevOps & Deployment

- Docker
- CI/CD Pipeline
- AWS Deployment
- Nginx Reverse Proxy

---

# 🧠 Learning Goals of This Project

The primary goal of this project is to deeply understand:

- Backend Engineering
- Scalable API Design
- Security Architecture
- Database Modeling
- Authentication Systems
- Production-level Backend Patterns
- Performance Optimization
- Maintainable Project Structure

instead of building tutorial-level CRUD applications only.

---

# 👨‍💻 Author

## Bhanu Pratap Patkar

Backend Developer | MERN Stack Developer

GitHub:
https://github.com/Bppatkar

---

# ⭐ Project Vision

Build a production-style backend system while learning:

- Real-world backend architecture
- Security best practices
- Scalable database design
- Production engineering workflows
- System design fundamentals

step-by-step through practical implementation.

---
