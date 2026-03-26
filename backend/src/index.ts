import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { register, login, getMe } from './controllers/auth.controller';
import { createTeacherWithUser, getAllTeachers } from './controllers/teacher.controller';
import { authenticate } from './middleware/auth.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Auth Routes
const authRouter = express.Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', authenticate, getMe);

// Teacher/Data Routes
const dataRouter = express.Router();
dataRouter.post('/teacher', authenticate, createTeacherWithUser); // Single POST for both tables
dataRouter.get('/teachers', authenticate, getAllTeachers);       // Get combined data

app.use('/api/auth', authRouter);
app.use('/api/data', dataRouter);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'OK' }));

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
