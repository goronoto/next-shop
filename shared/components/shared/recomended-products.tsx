'use client';

import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';
import { ProductCard } from './product-card';
import { SafeProduct, SafeProducts } from '@/shared/types/safe-products-type';
import { Carousel } from '../ui';
import { CarouselContent, CarouselItem } from '../ui/carousel';
import { cn } from '@/shared/lib/utils';

interface SliderProps {
    products: SafeProduct[];
    isRecommended?: boolean;
    className?: string;
}

export const RecommendedProduct = ({
    products,
    isRecommended,
    className,
}: SliderProps) => {
    return (
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            className={cn('overflow-hidden', className)}
        >
            <CarouselContent className="-ml-4">
                {products.map((product) => (
                    <CarouselItem key={product.id}>
                        <ProductCard
                            isRecommended={isRecommended}
                            product={product}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};
