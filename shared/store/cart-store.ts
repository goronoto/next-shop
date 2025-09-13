import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SafeProduct } from '../types/safe-products-type';

export type cartItem = {
    product: SafeProduct;
    quantity: number;
    cartItemId: string;
};

type CartState = {
    items: cartItem[];
    userId: string | null;
    isLoading: boolean;
};

type CartActions = {
    setIsLoading: (isLoading: boolean) => void;
    addItem: (product: SafeProduct) => void;
    setItems: (items: cartItem[]) => void;
    removeItem: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    clearCart: () => void;
    setUserId: (userId: string | null) => void;
};

export const useCartStore = create<CartState & CartActions>()(
    persist(
        (set, get) => ({
            items: [],
            userId: null,
            isLoading: false,

            setIsLoading: (isLoading: boolean) => set({ isLoading }),

            addItem: (product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find(
                    (item) => item.product.id === product.id
                );

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({
                        items: [
                            ...currentItems,
                            {
                                product,
                                quantity: 1,
                                cartItemId: crypto.randomUUID(),
                            },
                        ],
                    });
                }
            },

            setItems: (items) => set({ items }),

            removeItem: (cartItemId) => {
                set({
                    items: get().items.filter(
                        (item) => item.cartItemId !== cartItemId
                    ),
                });
            },

            updateQuantity: (cartItemId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(cartItemId);
                } else {
                    set({
                        items: get().items.map((item) =>
                            item.cartItemId === cartItemId
                                ? { ...item, quantity }
                                : item
                        ),
                    });
                }
            },

            clearCart: () => {
                set({ items: [] });
            },

            setUserId: (userId) => set({ userId }),
        }),
        {
            name: 'cart-storage-guest',
            storage: createJSONStorage(() => localStorage),

            partialize: (state) => ({
                items: state.items,
                userId: state.userId,
            }),
        }
    )
);
