'use client';
import React from 'react';
import { Button, Sheet } from '../ui';
import {
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../ui/sheet';
import { BoxIcon, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/shared/store/cart-store';
import { CARTitem } from './cart-item';

interface Props {}

export const CartSheet: React.FC<Props> = ({}) => {
    const { items, clearCart } = useCartStore();

    const totalPrice = items.reduce((sum, item) => {
        const itemCost = parseFloat(item.product.price) * item.quantity;
        return sum + itemCost;
    }, 0);
    return (
        <Sheet>
            <SheetTrigger className="relative rounded-md p-2 text-white hover:bg-gray-500">
                <ShoppingCart />

                {items.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs">
                        {items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                )}
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>Cart</SheetTitle>
                    <SheetDescription className="mb-5">
                        Here you can see product that you add to the cart
                    </SheetDescription>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="mt-5 flex flex-col items-center justify-center gap-4">
                        <BoxIcon />
                        <p>You Cart Is Empty Try Add some </p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto pr-4">
                        <ul className="flex flex-col gap-4 first:mt-5">
                            {items.map((item) => (
                                <li
                                    key={item.product.id}
                                    className="border-2 border-gray-200 p-2"
                                >
                                    <CARTitem item={item} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {items.length > 0 && (
                    <SheetFooter className="mt-4">
                        <div className="flex w-full flex-col gap-2">
                            <div className="flex items-center justify-between text-lg font-bold">
                                <span>Total:</span>
                                <span>{totalPrice.toFixed(2)} грн</span>
                            </div>
                            <Button onClick={clearCart} variant="destructive">
                                Clear the cart
                            </Button>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};
