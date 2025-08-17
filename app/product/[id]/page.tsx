import { Container, ProductDetails } from '@/shared/components/shared';
import { fetchProduct } from '@/shared/services/get-product-data';
import { notFound } from 'next/navigation';
import React from 'react';

interface ProductPageProps {
    params: {
        id: string;
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;

    const safeProduct = await fetchProduct(parseInt(id, 10));

    if (!safeProduct) {
        notFound();
    }

    return (
        <div className="bg-[#f5f5f5]">
            <Container>
                <ProductDetails product={safeProduct} />
            </Container>
        </div>
    );
}
