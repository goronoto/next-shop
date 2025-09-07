'use client';
import { cn } from '@/shared/lib/utils';
import { cartItem, useCartStore } from '@/shared/store/cart-store';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui';
import { ImageIcon, Trash2 } from 'lucide-react';

interface Props {
    className?: string;
    item: cartItem;
}

const selectRemoveItem = (state: ReturnType<typeof useCartStore.getState>) =>
    state.removeItem;

const selectUpdateQuantity = (
    state: ReturnType<typeof useCartStore.getState>
) => state.updateQuantity;

export const CARTitem: React.FC<Props> = ({ className, item }) => {
    const removeItem = useCartStore(selectRemoveItem);
    const updateQuantity = useCartStore(selectUpdateQuantity);

    const itemPrice = parseFloat(item.product.price);
    const totalPrice = itemPrice * item.quantity;

    return (
        <div className={cn('flex items-center gap-4', className)}>
            <div className="flex-shrink-0">
                {item.product.imageUrl ? (
                    <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        width={40}
                        height={40}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-md bg-secondary">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p className="w-full truncate text-sm font-medium">
                    {item.product.name}
                </p>

                <div className="flex w-full items-center justify-between">
                    <p className="text-base font-semibold">
                        {totalPrice.toFixed(2)} грн
                    </p>

                    <div className="flex items-center gap-2">
                        <Button
                            size="icon"
                            className="h-7 w-7"
                            variant={'outline'}
                            onClick={() =>
                                updateQuantity(
                                    item.product.id,
                                    item.quantity - 1
                                )
                            }
                        >
                            -
                        </Button>
                        <p className="w-6 text-center text-sm">
                            {item.quantity}
                        </p>
                        <Button
                            size="icon"
                            className="h-7 w-7"
                            variant={'outline'}
                            onClick={() =>
                                updateQuantity(
                                    item.product.id,
                                    item.quantity + 1
                                )
                            }
                        >
                            +
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-gray-500 hover:text-red-500"
                            onClick={() => removeItem(item.product.id)}
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
