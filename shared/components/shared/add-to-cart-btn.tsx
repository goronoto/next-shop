'use client';
import { cn } from '@/shared/lib/utils';
import { SafeProduct } from '@/shared/types/safe-products-type';
import React from 'react';
import { Button } from '../ui';
import { useCartStore } from '@/shared/store/cart-store';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
    className?: string;
    product: SafeProduct;
    isFullPage?: boolean;
}

export const AddToCartBtn: React.FC<Props> = ({
    className,
    product,
    isFullPage = false,
}) => {
    const { addItem } = useCartStore();

    const handleAddItem = () => {
        addItem(product);
        console.log(`${product.name} has been added to the cart`);
        toast.success('product added to cart');
    };
    return isFullPage ? (
        <Button
            onClick={handleAddItem}
            size="lg"
            className="mt-2 w-full bg-rozetka-green"
        >
            <ShoppingCart className="mr-2 h-7 w-7" />
            <span>Купити</span>
        </Button>
    ) : (
        <Button
            onClick={handleAddItem}
            variant="outline"
            size="icon"
            className={cn(
                'border-2 border-gray-300 text-gray-400 hover:border-rozetka-green hover:text-rozetka-green',
                className
            )}
        >
            <ShoppingCart className="h-4 w-4" />
        </Button>
    );
};
