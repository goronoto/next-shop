'use server';

import { Product } from '@prisma/client';
import { prisma } from '../lib/prisma';

interface CreateProductData {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: number;
}

export const createProduct = async (
    data: CreateProductData
): Promise<Product> => {
    try {
        const newProduct = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                imageUrl: data.imageUrl,
                categoryId: data.categoryId,
            },
        });
        console.log('Product created successfully:', newProduct);
        return newProduct;
    } catch (error) {
        console.error('Failed to create product:', error);
        throw new Error('Failed to create product.');
    }
};
