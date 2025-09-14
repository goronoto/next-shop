import { prisma } from '../lib/prisma';

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    } catch (error) {
        console.log('Failed to get user by email');
        return null;
    }
};
