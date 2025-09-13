'use client';
import { cn } from '@/shared/lib/utils';
import { SafeProduct } from '@/shared/types/safe-products-type';
import React from 'react';
import { Button } from '../ui';
import { useCartStore } from '@/shared/store/cart-store';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { addToCart } from '@/shared/actions/cart-actions';

interface Props {
    className?: string;
    product: SafeProduct;
    isFullPage?: boolean;
}

const selectAddItem = (state: ReturnType<typeof useCartStore.getState>) =>
    state.addItem;

const selectUserId = (state: ReturnType<typeof useCartStore.getState>) =>
    state.userId;

const selectSetItems = (state: ReturnType<typeof useCartStore.getState>) =>
    state.setItems;

export const AddToCartBtn: React.FC<Props> = ({
    className,
    product,
    isFullPage = false,
}) => {
    const addItem = useCartStore(selectAddItem);
    const userId = useCartStore(selectUserId);
    const setItems = useCartStore(selectSetItems);
    const [isAdding, setIsAdding] = React.useState(false);

    async function handleAddToCart(product: SafeProduct) {
        setIsAdding(true);

        if (userId) {
            const updatedCart = await addToCart(product.id);

            const newItem =
                updatedCart?.items.map((item) => ({
                    product: {
                        ...item.product,
                        price: item.product.price.toString(),
                        createdAt: item.product.createdAt.toISOString(),
                        updatedAt: item.product.updatedAt.toISOString(),
                    },
                    quantity: item.quantity,
                    cartItemId: item.id,
                })) ?? [];

            setItems(newItem);
            toast.success('product added to cart');
        } else {
            addItem(product);
            toast.success('product added to cart');
        }

        setIsAdding(false);
    }

    return isFullPage ? (
        <Button
            disabled={isAdding}
            onClick={() => handleAddToCart(product)}
            size="lg"
            className="mt-2 w-full bg-rozetka-green"
        >
            <ShoppingCart className="mr-2 h-7 w-7" />
            <span>Buy</span>
        </Button>
    ) : (
        <Button
            disabled={isAdding}
            onClick={() => handleAddToCart(product)}
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
