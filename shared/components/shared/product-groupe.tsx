import { cn } from '@/shared/lib/utils';
import { SafeProduct, SafeProducts } from '@/shared/types/safe-products-type';
import React from 'react';
import { ProductCard } from './product-card';

interface Props {
    products: SafeProduct[];
    className?: string;
}

export const ProductGroupe: React.FC<Props> = ({ products, className }) => {
    return (
        <div
            className={cn(
                'mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4',
                className
            )}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
