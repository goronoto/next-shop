'use server';

import { RegisterSchema, TRegisterSchema } from '../lib/auth';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

export const registerUser = async (value: TRegisterSchema) => {
    const validatedFields = RegisterSchema.safeParse(value);

    if (!validatedFields.success) {
        return { error: 'Invalid Data' };
    }

    const { name, password, email } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: 'User with this email is already exist' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return { success: 'User have registered successfully' };
};
