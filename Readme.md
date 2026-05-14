# 🚀 Social Media Backend API

### Production-Style Scalable Backend using Node.js, Express, MongoDB & TypeScript

---

# 🌍 Overview

A professionally structured and scalable social media backend built with modern backend engineering practices.

This project focuses heavily on:

* Scalable Architecture
* Backend Engineering Principles
* Production Authentication Systems
* Security Architecture
* Performance Optimization
* Reusable Backend Patterns
* Clean Code Organization
* Real-world API Design

Inspired by backend architectures used in:

* Instagram
* Twitter/X
* LinkedIn
* Threads

---

# ⚡ Tech Stack

## 🖥️ Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose

---

# 🔐 Authentication & Security

## ✅ Production Authentication System

* JWT Access Token
* JWT Refresh Token
* Refresh Token Rotation
* Session Rotation
* Refresh Token Revocation
* Database-based Session Management
* Protected Routes
* Authentication Middleware
* Secure Logout Architecture
* Current User Endpoint

---

## ✅ Security Middleware

* Helmet
* Express Rate Limit
* HPP Protection
* MongoDB Injection Protection
* Secure Error Responses

---

# ✅ Validation

* Zod Validation
* Request Validation Middleware
* Params Validation
* Query Validation
* MongoDB ObjectId Validation
* Structured Validation Errors

---

# 🧠 Backend Architecture

* Controller Layer
* Service Layer
* Middleware Layer
* Validation Layer
* Utility Layer
* Centralized Error Handling

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

# 🔐 AUTHENTICATION FLOW

# LOGIN FLOW

```text
User Login
   ↓
Verify Credentials
   ↓
Generate Access Token
   ↓
Generate Refresh Token
   ↓
Store Refresh Token In Database
   ↓
Return Tokens To Client
```

---

# REFRESH TOKEN FLOW

```text
Access Token Expired
   ↓
Frontend Calls /auth/refresh
   ↓
Backend Verifies Refresh Token
   ↓
Check Token In Database
   ↓
Check isRevoked Flag
   ↓
Check Expiry Time
   ↓
Generate New Access Token
```

---

# LOGOUT FLOW

```text
User Clicks Logout
   ↓
Frontend Sends Refresh Token
   ↓
Backend Revokes Session
   ↓
Token Becomes Invalid
```

---

# SESSION ROTATION FLOW

```text
User Logs In Again
   ↓
Old Refresh Tokens Revoked
   ↓
New Refresh Token Generated
   ↓
Only Latest Session Remains Active
```

---

# 🧠 Backend Engineering Concepts Applied

Implemented concepts include:

* Layered Architecture
* Separation of Concerns
* Centralized Error Handling
* Production Authentication Architecture
* Refresh Token Rotation
* Session Revocation
* Reusable Middleware Design
* Production-style API Responses
* Pagination Architecture
* Search & Sorting Utilities
* Scalable MongoDB Relationship Modeling
* Denormalization Concepts
* Indexing Strategies

---

# ✨ Features Implemented

# ✅ Authentication System

* User Registration
* User Login
* Access Token Authentication
* Refresh Token Authentication
* Refresh Token Rotation
* Session Rotation
* Refresh Token Revocation
* Secure Logout
* Protected Routes
* Current User Endpoint (`/auth/me`)

---

# ✅ Post System

* Create Post
* Update Post
* Delete Post
* Get Single Post
* Feed API
* Pagination
* Search
* Sorting
* Ownership Validation

---

# ✅ Like System

* Like Post
* Unlike Post
* Duplicate Like Prevention

---

# ✅ Comment System

* Add Comment
* Delete Comment
* Get Post Comments

---

# ✅ Follow System

* Follow User
* Unfollow User
* Self-follow Prevention

---

# 🔍 Example Validation Error

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

# 📦 API Response Standardization

## ✅ Success Response

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

---

# ❌ Error Response

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

# 🧪 Example API Endpoints

# 🔐 Auth

```http
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
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

# 🚀 Getting Started

## 1️⃣ Install Dependencies

```bash
npm install
```

---

## 2️⃣ Setup Environment Variables

```env
PORT=3000

MONGODB_URI=your_mongodb_uri

JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=15m

JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d
```

---

## 3️⃣ Run Development Server

```bash
npm run dev
```

---

# 🚀 Upcoming Features

## 🍪 Cookie Authentication

* HTTP-only Cookies
* Secure Cookies
* SameSite Cookies

---

## 🔐 Advanced Security

* Refresh Token Reuse Detection
* RBAC
* Device-based Sessions
* Token Blacklisting

---

## ⚡ Scalability

* Redis Caching
* Feed Optimization
* Queue Systems

---

## 📦 Media Features

* Multer Uploads
* Cloudinary Integration

---

## 🔔 Realtime Features

* Socket.IO
* Live Notifications
* Real-time Chat

---

## 🚀 DevOps

* Docker
* CI/CD
* AWS Deployment
* Nginx

---

# 👨‍💻 Author

## Bhanu Pratap Patkar

Backend Developer | MERN Stack Developer

GitHub:
https://github.com/Bppatkar

---

# ⭐ Vision

Build a production-style backend system while deeply learning:

* Backend Engineering
* Security Architecture
* Scalable System Design
* Authentication Systems
* Performance Optimization
* Production Workflows

through practical implementation.
