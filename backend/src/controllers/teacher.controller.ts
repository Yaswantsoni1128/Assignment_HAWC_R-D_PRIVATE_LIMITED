import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

// POST /api/teachers
// Creates both auth_user and teacher in a single request (1-1 relationship)
export const createTeacherWithUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, first_name, last_name, password, university_name, gender, year_joined, subject, phone } = req.body;

		// Validation
		if (!email || !first_name || !last_name || !password || !university_name || !gender || !year_joined || !subject) {
			res.status(400).json({ success: false, message: 'Missing required fields' });
			return;
		}

		// Check if user exists
		const existing = await prisma.auth_user.findUnique({ where: { email } });
		if (existing) {
			res.status(409).json({ success: false, message: 'Email already exists' });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		// Single transaction to ensure atomicity
		const result = await prisma.$transaction(async (tx) => {
			const newUser = await tx.auth_user.create({
				data: {
					email,
					first_name,
					last_name,
					password: hashedPassword,
				},
			});

			const newTeacher = await tx.teachers.create({
				data: {
					user_id: newUser.id,
					university_name,
					gender,
					year_joined: parseInt(year_joined),
					subject,
					phone,
				},
			});

			return { user: newUser, teacher: newTeacher };
		});

		res.status(201).json({
			success: true,
			message: 'Teacher and User created successfully',
			data: result,
		});
	} catch (error) {
		console.error('Create teacher error:', error);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
};

// GET /api/teachers
// Fetches all teachers with their associated user data
export const getAllTeachers = async (_req: Request, res: Response): Promise<void> => {
	try {
		const teachers = await prisma.teachers.findMany({
			include: {
				user: {
					select: {
						email: true,
						first_name: true,
						last_name: true,
					},
				},
			},
		});
		res.json({ success: true, data: teachers });
	} catch (error) {
		console.error('Fetch teachers error:', error);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
};
