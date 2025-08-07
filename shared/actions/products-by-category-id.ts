'use server';

import { prisma } from '../lib/prisma';
import { SafeProduct } from '../types/safe-products-type';

export const getProductsByCategoryId = async (
    categoryId: number
): Promise<SafeProduct[]> => {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: categoryId,
            },
            include: {
                category: true,
            },
            take: 20,
        });

        const safeProducts: SafeProduct[] = products.map((product) => ({
            ...product,
            price: product.price.toString(),
            createdAt: product.createdAt.toISOString(),
            updatedAt: product.updatedAt.toISOString(),
        }));

        return safeProducts;
    } catch (error) {
        console.error(
            `Failed to get products for category ${categoryId}:`,
            error
        );
        return [];
    }
};
