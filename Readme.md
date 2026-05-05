# 🚀 Social Media Application (MERN + TypeScript)

A **production-ready full-stack social media application** built using the MERN stack with TypeScript. This project focuses on **scalability, clean architecture, and real-world backend design patterns**.

---

## 🧠 Project Goal

Build a **real-world social platform** where users can:

- Create and share posts
- Like and comment on posts
- Follow/unfollow users
- View personalized feeds
- Manage profiles securely

---

## 🛠️ Tech Stack

### Frontend

- React 18+
- TypeScript
- Tailwind CSS
- Redux Toolkit / Context API
- Axios
- React Router

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT (Authentication)
- bcryptjs (Password hashing)

### Dev Tools

- Nodemon
- ESLint
- Prettier

---

## ✨ Features

- 🔐 Authentication (JWT-based login/register)
- 👤 User Profiles (bio, profile image)
- 📝 Posts (CRUD operations)
- ❤️ Like System (optimized with counts)
- 💬 Comments System
- 👥 Follow/Unfollow Users
- 📰 Feed System (latest + following posts)

---

## 🧱 Database Design (Mongoose Models)

### 🧑 User Model

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
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
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

### 📝 Post Model

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
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  likeCount: {
    type: Number,
    default: 0
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  commentCount: {
    type: Number,
    default: 0
  },
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

### 💬 Comment Model

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
    required: true
  },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
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

### ❤️ Like Model (Important for Scaling)

```ts
{
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  likedBy: {
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

👉 **Why Like Model?**

- Tracks history (who liked when)
- Prevents duplicate likes
- Useful for analytics

---

## 📊 Entity Relationship Diagram

```
User ─── creates ───▶ Post
User ─── writes ───▶ Comment
User ─── likes ───▶ Post
User ─── follows ───▶ User

Post ─── has ───▶ Comment
Post ─── has ───▶ Like
```

---

## 🔌 API Design

### 🔐 Auth Routes

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
```

---

### 👤 User Routes

```
GET    /api/users/:id
PUT    /api/users/:id
POST   /api/users/:id/follow
DELETE /api/users/:id/follow
GET    /api/users/:id/followers
GET    /api/users/:id/following
```

---

### 📝 Post Routes

```
GET    /api/posts
POST   /api/posts
GET    /api/posts/:id
PUT    /api/posts/:id
DELETE /api/posts/:id
```

---

### ❤️ Like Routes

```
POST   /api/likes
DELETE /api/likes/:postId
GET    /api/likes/:postId
```

---

### 💬 Comment Routes

```
POST   /api/comments
PUT    /api/comments/:id
DELETE /api/comments/:id
GET    /api/comments/:postId
```

---

## 🧠 Backend Architecture

```
controllers → business logic
routes → API endpoints
models → database schema
middleware → auth + error handling
utils → helper functions
```

---

## 📁 Project Structure

```
social-media/
│
├── server/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
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

## 🚀 Setup Instructions

### 1️⃣ Clone Repo

```bash
git clone <your-repo-url>
cd social-media
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 🔑 Environment Variables

### Backend `.env`

```
PORT=5000
MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret
JWT_EXPIRY=7d

REFRESH_TOKEN_SECRET=your_refresh_secret

CORS_ORIGIN=http://localhost:3000
```

---

## 🔒 Security Practices

- Password hashing using bcrypt
- JWT-based authentication
- Input validation
- Proper error handling
- Protected routes middleware

---

## 📈 Performance Considerations

- Use `likeCount` & `commentCount` (denormalization)
- Indexing on:
  - email
  - username
  - post owner

- Pagination for feeds
- Lazy loading for frontend

---

## 🎯 Future Improvements

- 🔔 Notifications system
- 📩 Real-time chat (Socket.IO)
- 📸 Media uploads (Cloudinary)
- 🧠 AI-based feed ranking
- 📊 Analytics dashboard

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Your Name Here**

---

## ⭐ Final Note

This project is designed to reflect **real-world backend engineering practices**, not just CRUD operations.

👉 Perfect for:

- Portfolio
- Interviews
- Internship / Job applications
