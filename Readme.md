# 🚀 Social Media Backend API

Production-Grade Social Media Backend built using Node.js, Express.js, TypeScript, MongoDB, Redis and deployed on AWS.

---

# 🌍 Overview

This project focuses on real-world backend engineering practices used in scalable production applications.

Inspired by architectures used in:

- Instagram
- Twitter/X
- LinkedIn
- Threads

Focus Areas:

- Authentication Architecture
- Security Engineering
- Scalable Backend Design
- Redis Caching
- Monitoring & Observability
- API Documentation
- Testing
- Dockerization
- CI/CD Automation
- Cloud Deployment

---

# ⚡ Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

## Authentication

- JWT Access Tokens
- JWT Refresh Tokens
- Refresh Token Rotation
- Session Management
- Cookie Authentication
- Role-Based Access Control (RBAC)

## Validation

- Zod

## Caching

- Redis

## Media

- Cloudinary
- Multer

## Security

- Helmet
- HPP
- Mongo Sanitize
- Rate Limiting
- Compression
- Secure HTTP-Only Cookies

## Logging & Monitoring

- Winston
- Morgan
- Audit Logs
- Error Logs
- Monitoring APIs

## Testing

- Jest
- Supertest

## Documentation

- Swagger
- OpenAPI

## DevOps

- Docker
- Docker Compose
- GitHub Actions
- AWS EC2
- PM2

---

# 🏗️ Architecture

Client

↓

Security Middleware

↓

Validation Middleware

↓

Authentication Middleware

↓

Authorization Middleware

↓

Controller Layer

↓

Service Layer

↓

Database Layer

↓

Centralized Response

---

# ✨ Features

## Authentication

- User Registration
- User Login
- User Logout
- JWT Authentication
- Refresh Token Rotation
- Session Management
- Cookie Authentication
- Current User Endpoint
- Role-Based Access Control

---

## User Profile

- Get Profile
- Update Profile
- Profile Image Upload
- Cloudinary Integration
- Redis Profile Cache

---

## Posts

- Create Post
- Update Post
- Delete Post
- Get Single Post
- User Posts
- Search
- Sorting
- Pagination

---

## Feed System

- Global Feed
- Cursor Pagination
- Redis Feed Cache
- Feed Cache Invalidation

---

## Follow System

- Follow User
- Unfollow User
- Get Followers
- Get Following

---

## Like System

- Like Post
- Unlike Post
- Duplicate Prevention

---

## Comment System

- Create Comment
- Update Comment
- Delete Comment
- Get Comments

---

## Security Features

- Helmet
- Rate Limiting
- HPP Protection
- Mongo Sanitization
- Compression
- Secure Cookies
- RBAC Authorization

---

## Monitoring & Observability

- Health Check API
- Metrics API
- Error Monitoring
- Structured Logging
- Audit Logging
- Request Tracking

Endpoints:

```http
GET /api/monitoring/health
GET /api/monitoring/metrics
```

---

## Admin Dashboard

Admin-only endpoint:

```http
GET /api/admin/dashboard
```

Provides:

- Total Users
- Total Posts
- Total Comments
- Total Likes

---

## Testing

- Jest
- Supertest
- Integration Tests

---

## API Documentation

Swagger UI:

```http
/api/docs
```

---

## Docker

Build:

```bash
docker compose build
```

Run:

```bash
docker compose up
```

Background:

```bash
docker compose up -d
```

Stop:

```bash
docker compose down
```

---

## CI/CD

GitHub Actions Pipeline:

- Install Dependencies
- Build Application
- Run Tests
- Validate Production Readiness

---

## Production Deployment

Infrastructure:

- AWS EC2
- PM2 Process Manager
- MongoDB Atlas
- Redis Cloud

Deployment Flow:

```text
GitHub
↓
GitHub Actions
↓
AWS EC2
↓
PM2
↓
Production API
```

---

# 📦 API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me
PUT  /api/auth/profile
```

---

## Posts

```http
POST   /api/posts
GET    /api/posts
GET    /api/posts/:id
PUT    /api/posts/:id
DELETE /api/posts/:id
```

---

## Feed

```http
GET /api/feed
```

---

## Follow

```http
POST   /api/follows/:userId
DELETE /api/follows/:userId
GET    /api/follows/followers/:userId
GET    /api/follows/following/:userId
```

---

## Likes

```http
POST   /api/likes/:postId
DELETE /api/likes/:postId
```

---

## Comments

```http
POST   /api/comments
PUT    /api/comments/:commentId
DELETE /api/comments/:commentId
GET    /api/comments/post/:postId
```

---

## Monitoring

```http
GET /api/monitoring/health
GET /api/monitoring/metrics
```

---

## Admin

```http
GET /api/admin/dashboard
```

---

# 🚧 Upcoming Feature

## Socket.IO Notifications

- Follow Notifications
- Like Notifications
- Comment Notifications
- Real-Time Delivery
- Notification Persistence

---

# 👨‍💻 Author

Bhanu Pratap Patkar

GitHub:
https://github.com/Bppatkar

---

# ⭐ Vision

Build scalable, secure and production-grade backend systems while mastering backend engineering, system design, cloud deployment, observability and DevOps practices.
