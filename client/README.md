# SocialSphere

Production-ready social media platform built with modern enterprise architecture.

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Redux Toolkit
- RTK Query
- Axios
- React Hook Form
- Zod
- Socket.IO Client
- shadcn/ui

### Backend

- Express.js
- MongoDB
- Redis
- JWT Authentication
- Socket.IO
- Docker
- AWS
- Swagger
- GitHub Actions

## Architecture

```
┌─────────────────────────────────────┐
│          Next.js + React            │
│        (TypeScript, Tailwind)       │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│      Redux Toolkit + RTK Query      │
│      (State Management & Cache)     │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│       Axios + Socket.IO Client      │
│      (HTTP & Real-time Comms)       │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│  Express.js + MongoDB + Redis       │
│   (Backend API & Data Persistence)  │
└─────────────────────────────────────┘
```

## Project Goal

Build a production-ready social media platform demonstrating real-world engineering practices suitable for interviews and a strong portfolio.

The focus is engineering quality, scalability, maintainability and clean architecture rather than unnecessary features.

## Development Strategy

### Phase 1

Frontend UI

✅ Completed

- Responsive UI
- Reusable components
- Production folder structure
- Placeholder business logic

### Phase 2 (Current)

Frontend Logic

#### ✅ Authentication

- Login
- Register
- JWT
- Redux
- RTK Query
- Persist login

#### ✅ Feed

- Feed API
- Create post
- Edit post
- Delete post
- Like / Unlike
- Share
- Copy link

#### ✅ Profile

- View my profile
- View other user profiles
- Edit profile
- Upload avatar
- Follow / Unfollow
- Followers list
- Following list
- User posts

#### ✅ Search

- Search users
- Debounced search
- Suggested users
- Follow / Unfollow
- Navigate to user profile

### ✅ Comments

- View comments
- Create comment
- Edit own comment
- Delete own comment
- Owner-only actions
- Live comment count updates

## Upcoming Modules

1. Notifications
2. Settings
3. Admin dashboard
4. Socket.IO integration
5. Final production polish

## Features

### Authentication

- JWT authentication
- Protected routes
- Persist login

### Feed

- Create post
- Edit post
- Delete post
- Like
- Share

### Profile

- View profile
- Edit profile
- Upload avatar

### Search

- Search users
- Follow users

### Comments

- View comments
- Create comment
- Edit own comment
- Delete own comment

### Notifications

- Real-time notifications

### Admin

- Dashboard
- User management
- Analytics

## Project Status

- Backend: ✅ 100%
- Frontend UI: ✅ 100%
- Frontend Logic: 🚧 In Progress
- Current Module: **Notification**
- Overall Progress: **≈94%**

## Design Principles

- Production-grade architecture
- Clean code
- Type safety
- Reusable components
- Feature-based structure
- Interview-focused implementation
- Enterprise best practices

## Deliberately Excluded

To keep the project focused and interview-ready, the following features are intentionally excluded:

- Stories
- Reels
- Live streaming
- Chat system
- Marketplace
- Groups
- Video upload
- Overly complex recommendation systems
- Unnecessary visual effects

The emphasis is on demonstrating engineering quality rather than maximizing feature count.
