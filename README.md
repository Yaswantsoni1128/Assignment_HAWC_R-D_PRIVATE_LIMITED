# HAWC - Full Stack Assignment

A Premium Full-Stack Application built for HAWC R&D Private Limited Intern Task.

## 🚀 Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, Framer Motion, Lucide Icons, Axios.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM.
- **Database**: PostgreSQL (Prisma).
- **Auth**: JWT-based Bearer Authentication with `bcryptjs`.

## ✨ Features
- **1-1 Relationship**: Unified POST API creates both `auth_user` and `teachers` records in a single transaction.
- **Premium UI**: Modern dark theme with smooth micro-animations and responsive data tables.
- **Auth Module**: Secure Login and Registration APIs with token verification middleware.
- **Clean Architecture**: Separation of concerns with controllers, middleware, and type-safe data models.

## 🛠️ Step-by-Step Execution

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL Database (local or cloud)

### 2. Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file with your details:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/hawc_db"
   JWT_SECRET="your_secret_key"
   PORT=5000
   ```
4. Run migrations: `npx prisma db push`
5. Start development server: `npm run dev` (uses `tsx src/index.ts`)

### 3. Frontend Setup
1. `cd frontend`
2. `npm install`
3. Create a `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Start development server: `npm run dev`

### 4. Git Implementation
Project structure follows clean git commit principles. Initial commit contains the full skeleton, followed by incremental feature development.

## 📄 API Endpoints
- `POST /api/auth/login`: Authenticate user and return JWT.
- `GET /api/data/teachers`: Fetch integrated teacher and account data (needs Token).
- `POST /api/data/teacher`: Unified creation of user + teacher record (needs Token).
