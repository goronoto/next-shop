import { prisma } from '../lib/prisma';

export const searchProducts = async (
    query: string,
    option?: { take?: number }
) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ],
            },
            include: {
                category: true,
            },
            take: option?.take,
        });

        const safeProduct = products.map((product) => ({
            ...product,
            description: product.description?.toString(),
            createdAt: product.createdAt.toISOString(),
            updatedAt: product.updatedAt.toISOString(),
            price: product.price.toString(),
        }));

        return safeProduct;
    } catch (error) {
        console.log('Failed to get searched products', error);
        return [];
    }
};
