import { getProductById } from '@/shared/actions';
import { notFound } from 'next/navigation';
import { SafeProduct } from '../types/safe-products-type';

export const fetchProduct = async (id: number): Promise<SafeProduct> => {
    const productId = id;

    if (isNaN(productId)) {
        notFound();
    }
    const product = await getProductById(productId);

    const safeProduct = {
        ...product,
        price: product.price.toString(),
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        category: {
            ...product.category,
        },
    };

    return safeProduct;
};
