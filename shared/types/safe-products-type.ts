import type { Prisma } from '@prisma/client';

export type ProductWithCategory = Prisma.ProductGetPayload<{
    include: { category: true };
}>;

export type SafeProducts = Omit<ProductWithCategory, 'price'> & {
    price: string;
};

export type SafeProduct = Omit<
    ProductWithCategory,
    'price' | 'createdAt' | 'updatedAt'
> & {
    price: string;
    createdAt: string;
    updatedAt: string;
};
