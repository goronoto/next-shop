import { Category } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { SafeProduct } from '../types/safe-products-type';

export interface CategoryPageData {
    category: Category;
    products: SafeProduct[];
}

export const getCategoryPageData = async (
    slug: string
): Promise<CategoryPageData | null> => {
    try {
        const categoryWithProducts = await prisma.category.findUnique({
            where: { slug },
            include: {
                products: {
                    include: {
                        category: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });

        if (!categoryWithProducts) {
            return null;
        }

        const safeProducts: SafeProduct[] = categoryWithProducts.products.map(
            (product) => ({
                ...product,
                price: product.price.toString(),
                createdAt: product.createdAt.toISOString(),
                updatedAt: product.updatedAt.toISOString(),
            })
        );

        return {
            category: categoryWithProducts,
            products: safeProducts,
        };
    } catch (error) {
        console.error('[FAILED_GET_CATEGORY_PAGE_DATA]', error);
        return null;
    }
};
