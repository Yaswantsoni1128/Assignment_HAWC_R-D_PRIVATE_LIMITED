# HAWC - Unified Teacher & Account Management Portal

A premium Full-Stack application developed for the **HAWC R&D Private Limited** Intern Hiring Task. This project demonstrates a robust implementation of a 1-to-1 relationship between user accounts and teacher profiles, served through a modern React/Express stack.

---

## 🚀 Technology Stack

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Fetching**: Axios

### **Backend**
- **Runtime**: Node.js & TypeScript
- **Server**: Express
- **ORM**: Prisma (v6)
- **Authentication**: JWT (JSON Web Tokens) with Bearer Token Strategy
- **Security**: Bicryptjs for password hashing

### **Database**
- **Engine**: PostgreSQL
- **Pattern**: 1-to-1 strict relationship between `auth_user` and `teachers`

---

## ✨ Key Features & Task Fulfillment

- [x] **Unified POST API**: A single endpoint `/api/data/teacher` that creates both user and teacher records in a single PostgreSQL transaction.
- [x] **Token Authentication**: Secure login/register flow with JWT-protected data endpoints.
- [x] **Relational Integrity**: Prisma-enforced schema for unified management.
- [x] **Creative UI**: Premium dark-mode interface with smooth micro-animations and responsive data tables.
- [x] **Database Export**: SQL export file provided in `backend/database/hawc_db_export.sql`.

---

## 🛠️ Execution & Setup Guide

### **1. Clone & Prerequisite**
Ensure you have **Node.js (v18+)** and **PostgreSQL** installed.

### **2. Backend Setup**
1. Navigate to the folder: `cd backend`
2. Install dependencies: `npm install`
3. Configure Environment: Create a `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/hawc_db"
   JWT_SECRET="your_secret_key"
   PORT=5000
   ```
4. Setup Database: 
   - `npx prisma generate`
   - `npx prisma migrate dev`
5. Run Development Server: `npm run dev` (Runs on Port 5000)

### **3. Frontend Setup**
1. Navigate to the folder: `cd frontend`
2. Install dependencies: `npm install`
3. Configure Environment: Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Run App: `npm run dev` (Runs on Port 3000)

---

## 📄 API Endpoints
- `POST /api/auth/register`: Create a basic user account.
- `POST /api/auth/login`: Authenticate and receive a JWT.
- `POST /api/data/teacher`: Unified creation of User + Teacher (requires Auth).
- `GET /api/data/teachers`: Fetch integrated teacher list with user account details (requires Auth).

---

### **Made with <3 by [yaswantsoni1128](https://github.com/Yaswantsoni1128)**
