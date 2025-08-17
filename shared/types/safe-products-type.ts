import type { Category, Product } from '@prisma/client';

export type ProductWithCategory = Product & {
    category: Category;
};
export type SafeProducts = Omit<ProductWithCategory, 'price'> & {
    price: string;
};

type BaseSafeProduct = Omit<Product, 'price' | 'createdAt' | 'updatedAt'> & {
    price: string;
    createdAt: string;
    updatedAt: string;
};

export type SafeProduct = BaseSafeProduct & {
    category?: Category;
};
