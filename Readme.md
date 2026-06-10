# 🚀 Social Media Backend API

Production-Grade Social Media Backend built using Node.js, Express.js, TypeScript, MongoDB and Redis.

---

# 🌍 Overview

This project focuses on real-world backend engineering practices used in modern scalable applications.

Inspired by architectures used in:

* Instagram
* Twitter/X
* LinkedIn
* Threads

Focus Areas:

* Authentication Architecture
* Security Engineering
* Scalable Backend Design
* Redis Caching
* API Documentation
* Testing
* Dockerization
* CI/CD Automation

---

# ⚡ Tech Stack

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose

## Authentication

* JWT Access Tokens
* JWT Refresh Tokens
* Refresh Token Rotation
* Session Management
* Cookie Authentication

## Validation

* Zod

## Caching

* Redis

## Media

* Cloudinary
* Multer

## Security

* Helmet
* HPP
* Mongo Sanitize
* Rate Limiting
* Compression

## Logging

* Winston
* Morgan

## Testing

* Jest
* Supertest

## Documentation

* Swagger
* OpenAPI

## DevOps

* Docker
* Docker Compose
* GitHub Actions

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

* User Registration
* User Login
* User Logout
* JWT Authentication
* Refresh Token Rotation
* Session Management
* Cookie Authentication
* Current User Endpoint

---

## User Profile

* Get Profile
* Update Profile
* Profile Image Upload
* Cloudinary Integration
* Redis Profile Cache

---

## Posts

* Create Post
* Update Post
* Delete Post
* Get Single Post
* User Posts
* Search
* Sorting
* Pagination

---

## Feed System

* Global Feed
* Cursor Pagination
* Redis Feed Cache
* Feed Cache Invalidation

---

## Follow System

* Follow User
* Unfollow User
* Get Followers
* Get Following

---

## Like System

* Like Post
* Unlike Post
* Duplicate Prevention

---

## Comment System

* Create Comment
* Update Comment
* Delete Comment
* Get Comments

---

## Security Features

* Helmet
* Rate Limiting
* HPP Protection
* Mongo Sanitization
* Compression
* Secure Cookies

---

## Testing

* Jest
* Supertest
* Integration Tests

---

## API Documentation

Swagger UI available at:

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

* Install Dependencies
* Build Application
* Run Tests
* Validate Production Readiness

---

# 📦 API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me
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

## Follow

```http
POST /api/follows/:userId
DELETE /api/follows/:userId
```

---

## Likes

```http
POST /api/likes/:postId
DELETE /api/likes/:postId
```

---

## Comments

```http
POST /api/comments
PUT  /api/comments/:commentId
DELETE /api/comments/:commentId
```

---

# 🚀 Upcoming Features

## AWS Deployment

* EC2
* PM2
* Nginx
* MongoDB Atlas
* Redis Cloud

## Monitoring

* Health Check APIs
* Request Monitoring
* Structured Logging

## Realtime Notifications

* Socket.IO
* Follow Notifications
* Like Notifications
* Comment Notifications

---

# 👨‍💻 Author

Bhanu Pratap Patkar

GitHub:
https://github.com/Bppatkar

---

# ⭐ Vision

Build scalable, secure and production-grade backend systems while mastering backend engineering, system design and DevOps practices.
