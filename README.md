Task Manager Application (Full Stack)

A production-ready Task Management Application built using Next.js, MongoDB, and JWT Authentication.
This project demonstrates strong understanding of backend architecture, security, authentication, database design, and frontend integration.

🌐 Live Demo

🔗 Live Website: https://task-manager-nine-nu-32.vercel.app/
🔗 GitHub Repository: https://github.com/dipaldas8888/task_manager

📌 Features
🔐 Authentication & Security

User Registration & Login

JWT-based authentication

Secure HTTP-only cookies

Password hashing using bcrypt

AES encryption for sensitive data

Protected frontend routes (middleware)

🗂 Task Management

Create, Read, Update, Delete (CRUD) tasks

Each user can access only their own tasks

Task fields:

Title

Description

Status (Pending / Completed)

Created Date

🔍 Advanced Functionalities

Pagination (server-side)

Filter tasks by status

Search tasks by title

Real-time UI updates

🎨 Frontend UI

Clean dashboard layout:

Sidebar

Header

Filters/Search

Task List

Built with Next.js + Tailwind CSS

Icons using Lucide React

🛠 Tech Stack
Frontend & Backend

Next.js (App Router)

React

TypeScript

Backend & Security

Node.js (via Next.js API routes)

JWT Authentication

bcrypt (password hashing)

CryptoJS (AES encryption)

Database

MongoDB (Mongoose)

Deployment

Vercel (Frontend + Backend)

MongoDB Atlas (Cloud Database)

📁 Folder Structure
app/
api/
auth/
tasks/
dashboard/
layout.tsx
page.tsx
login/
register/

components/
Sidebar.tsx
Header.tsx
TaskCard.tsx
Filters.tsx

lib/
db.ts
auth.ts
encrypt.ts
validation.ts
api.ts

models/
User.ts
Task.ts

middleware.ts
⚙️ Environment Variables

Create a .env.local file:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AES_SECRET=your_aes_secret
