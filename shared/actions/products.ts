import { prisma } from '../lib/prisma';
import { SafeProduct } from '../types/safe-products-type';

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
        const safeProducts: SafeProduct[] = products.map((product) => ({
            ...product,
            category: product.category,
            price: product.price.toString(),
            createdAt: product.createdAt.toISOString(),
            updatedAt: product.updatedAt.toISOString(),
            description: product.description?.toString() || '',
        }));

        return safeProducts;
    } catch (error) {
        console.log('Failed to get products');
        return [];
    }
};
