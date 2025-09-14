import { prisma } from '../lib/prisma';

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    } catch (error) {
        console.log('Failed to get user by email');
        return null;
    }
};
