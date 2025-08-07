import { ProductDetails } from '@/shared/components/shared';
import { fetchProduct } from '@/shared/services/get-product-data';
import React from 'react';

interface ProductPageProps {
    params: {
        id: string;
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const safeProduct = await fetchProduct(params.id);

    return (
        <div className="bg-[#f5f5f5]">
            <ProductDetails product={safeProduct} />
        </div>
    );
}
