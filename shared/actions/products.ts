import { prisma } from '../lib/prisma';

export const getProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                category: true,
            },
        });
        return products;
    } catch (error) {
        console.log('Failed to get products');
        return [];
    }
};
