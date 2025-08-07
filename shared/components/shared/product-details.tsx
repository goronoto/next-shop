import { cn } from '@/shared/lib/utils';
import { SafeProduct } from '@/shared/types/safe-products-type';
import Image from 'next/image';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { ShoppingCart } from 'lucide-react';
import { Container } from './container';

interface Props {
    className?: string;
    product: SafeProduct;
}

export const ProductDetails: React.FC<Props> = ({ product, className }) => {
    return (
        <div className={cn('py-10', className)}>
            <Container className="flex flex-col gap-2 md:flex-row">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white p-4 md:w-1/2">
                    <Image src={product.imageUrl} alt={product.name} fill />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                    <div className="rounded-md bg-white p-4">
                        <Title text={product.name} size="md" />
                    </div>
                    <div className="rounded-md bg-white p-4">
                        <p>{product.description}</p>
                    </div>
                    <div className="rounded-md bg-white p-4">
                        <p className="text-3xl font-bold text-green-600">
                            {parseFloat(product.price).toLocaleString('uk-UA')}{' '}
                            грн
                        </p>
                        <Button
                            size="lg"
                            className="mt-2 w-full bg-rozetka-green"
                        >
                            <ShoppingCart className="mr-2 h-7 w-7" />
                            <span>Купити</span>
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
};
