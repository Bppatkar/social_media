# 🚀 Social Media Application (MERN + TypeScript)

A **production-ready, scalable full-stack social media application** built using the MERN stack with TypeScript.
This project focuses on **clean architecture, performance optimization, and real-world backend design patterns** used in large-scale systems.

---

# 🧠 Project Goal

Build a scalable social platform where users can:

* Create and share posts
* Like and comment on posts
* Follow/unfollow users
* View personalized feeds
* Manage user profiles securely

---

# 🛠️ Tech Stack

## Frontend

* React 18+
* TypeScript
* Tailwind CSS
* Redux Toolkit
* Axios
* React Router

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT (Authentication)
* bcryptjs (Password hashing)

## Dev Tools

* Nodemon
* ESLint
* Prettier

---

# ✨ Features

* 🔐 JWT-based Authentication (Login/Register)
* 👤 User Profiles (bio, profile image)
* 📝 Posts (Create, Read, Update, Delete)
* ❤️ Scalable Like System
* 💬 Comment System
* 👥 Follow/Unfollow Users
* 📰 Personalized Feed System

---

# 🧱 Database Design (Optimized for Scalability)

---

## 🧑 User Model

```ts
{
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email"]
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  bio: {
    type: String,
    maxlength: 250,
    default: ""
  },
  profileImage: {
    type: String,
    default: ""
  },

  // NOTE:
  // Followers and following arrays are NOT stored here.
  // Reason: Large users (millions of followers) can exceed MongoDB document size limit (16MB).

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

---

## 📝 Post Model

```ts
{
  content: {
    type: String,
    required: true,
    maxlength: 500
  },
  image: {
    type: String,
    default: ""
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true // Used in feed queries
  },

  // NOTE:
  // Likes array is removed to avoid large document growth.
  // Instead, Like collection is used.

  likeCount: {
    type: Number,
    default: 0
  },

  // NOTE:
  // Comments array is removed for scalability.

  commentCount: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now,
    index: true // Important for sorting feeds
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

---

## ❤️ Like Model (Source of Truth)

```ts
{
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
    index: true
  },
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

### Unique Index (Prevents Duplicate Likes)

```ts
LikeSchema.index({ post: 1, likedBy: 1 }, { unique: true });
```

---

## 💬 Comment Model

```ts
{
  content: {
    type: String,
    required: true,
    maxlength: 300
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
    index: true
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

---

## 👥 Follow Model

```ts
{
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

### Unique Index (Prevents Duplicate Follows)

```ts
FollowSchema.index({ follower: 1, following: 1 }, { unique: true });
```

---

# 📊 Entity Relationship

```
User ─── creates ───▶ Post
User ─── writes ───▶ Comment
User ─── likes ───▶ Post (via Like collection)
User ─── follows ───▶ User (via Follow collection)

Post ─── has ───▶ Comment
Post ─── has ───▶ Like
```

---

# 🔌 API Design

---

## 🔐 Auth Routes

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
```

---

## 👤 User Routes

```
GET    /api/users/:id
PUT    /api/users/:id
POST   /api/users/:id/follow
DELETE /api/users/:id/follow
```

---

## 📰 Feed Route (Important)

```
GET /api/posts/feed
```

### Why not `/api/posts`?

Fetching all posts is not scalable.
Feed returns only posts from followed users.

---

## 📝 Post Routes

```
POST   /api/posts
GET    /api/posts/:id
PUT    /api/posts/:id
DELETE /api/posts/:id
```

---

## ❤️ Like Routes

```
POST   /api/likes
DELETE /api/likes/:postId
GET    /api/likes/:postId
```

---

## 💬 Comment Routes

```
POST   /api/comments
GET    /api/comments/:postId
DELETE /api/comments/:id
```

---

# ⚡ Performance Optimization

---

## Indexing

```ts
PostSchema.index({ owner: 1, createdAt: -1 });
```

### Why?

* Optimizes feed queries
* Avoids full collection scan

---

## Time Complexity

| Operation            | Complexity |
| -------------------- | ---------- |
| Feed (without index) | O(n)       |
| Feed (with index)    | O(log n)   |

---

## Pagination (Recommended)

Use cursor-based pagination:

```
GET /api/posts/feed?cursor=<timestamp>&limit=10
```

---

# 🧠 Backend Architecture

```
routes → controllers → services → models
```

### Why Service Layer?

* Clean separation of logic
* Reusability
* Industry best practice

---

# 📁 Project Structure

```
social-media/
│
├── server/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── utils/
│   │   └── app.ts
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.tsx
```

---

# 🚀 Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd social-media
```

---

## 2️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

---

# 🔑 Environment Variables

## Backend (.env)

```
PORT=5000
MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret
JWT_EXPIRY=7d

REFRESH_TOKEN_SECRET=your_refresh_secret

CORS_ORIGIN=http://localhost:3000
```

---

# 🔒 Security Practices

* Password hashing using bcrypt
* JWT-based authentication
* Input validation
* Protected routes middleware
* Unique indexes to prevent duplicates

---

# 📈 Scalability Considerations

* Avoid large arrays in documents
* Use separate collections (Like, Follow)
* Use denormalization (counts)
* Add proper indexing
* Implement pagination

---

# 🚀 Future Improvements

* 🔔 Notifications System
* 📩 Real-time Chat (Socket.IO)
* 📸 Media Upload (Cloudinary)
* ⚡ Redis Caching
* 📊 Analytics Dashboard
* 🧠 AI-based Feed Ranking

---

# 👨‍💻 Author

**Bhanu Pratap Patkar**

---
