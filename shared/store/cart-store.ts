import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SafeProduct } from '../types/safe-products-type';

export type cartItem = {
    product: SafeProduct;
    quantity: number;
};

type CartState = {
    items: cartItem[];
};

type CartActions = {
    addItem: (product: SafeProduct) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartState & CartActions>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product) => {
                const { items } = get();
                const existingItem = items.find(
                    (item) => item.product.id === product.id
                );

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { product, quantity: 1 }] });
                }
            },

            removeItem: (productId) => {
                set({
                    items: get().items.filter(
                        (item) => item.product.id !== productId
                    ),
                });
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                } else {
                    set({
                        items: get().items.map((item) =>
                            item.product.id === productId
                                ? { ...item, quantity }
                                : item
                        ),
                    });
                }
            },

            clearCart: () => {
                set({ items: [] });
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
