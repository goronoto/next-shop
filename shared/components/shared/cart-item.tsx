'use client';
import { cn } from '@/shared/lib/utils';
import { cartItem } from '@/shared/store/cart-store';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui';
import { ImageIcon, Trash2 } from 'lucide-react';
import { CartItem } from '@prisma/client';

interface Props {
    className?: string;
    item: cartItem;
    handleUpdateQuantity: (cartItemId: string, quantity: number) => void;
    handleDeleteCartItem: (cartItemId: string) => void;
    isLoading: boolean;
    cartItemId: CartItem['id'];
}

export const CARTitem: React.FC<Props> = ({
    className,
    item,
    handleUpdateQuantity,
    handleDeleteCartItem,
    isLoading,
    cartItemId,
}) => {
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
                            disabled={isLoading}
                            size="icon"
                            className="h-7 w-7"
                            variant={'outline'}
                            onClick={() =>
                                handleUpdateQuantity(
                                    cartItemId,
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
                            disabled={isLoading}
                            size="icon"
                            className="h-7 w-7"
                            variant={'outline'}
                            onClick={() =>
                                handleUpdateQuantity(
                                    cartItemId,
                                    item.quantity + 1
                                )
                            }
                        >
                            +
                        </Button>
                        <Button
                            disabled={isLoading}
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-gray-500 hover:text-red-500"
                            onClick={() => handleDeleteCartItem(cartItemId)}
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
