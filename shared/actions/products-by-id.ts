import { notFound } from 'next/navigation';
import { prisma } from '../lib/prisma';
import { de } from 'zod/v4/locales';

export const getProductById = async (id: number) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id,
            },
            include: {
                category: true,
            },
        });

        if (!product) {
            notFound();
        }

        const safeProduct = {
            ...product,
            description: product.description?.toString(),
            createdAt: product.createdAt.toISOString(),
            updatedAt: product.updatedAt.toISOString(),
            price: product.price.toString(),
        };

        return safeProduct;
    } catch (error) {
        console.log('Failed to get products by id');
        throw new Error('Could not fetch product.');
    }
};
