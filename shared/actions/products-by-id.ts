import { notFound } from 'next/navigation';
import { prisma } from '../lib/prisma';

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

        return product;
    } catch (error) {
        console.log('Failed to get products by id');
        throw new Error('Could not fetch product.');
    }
};
