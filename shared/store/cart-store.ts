import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SafeProduct } from '../types/safe-products-type';
import { boolean } from 'zod';

export type cartItem = {
    product: SafeProduct;
    quantity: number;
};

type CartState = {
    items: cartItem[];
    _hasHydrated: boolean;
};

type CartActions = {
    addItem: (product: SafeProduct) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    initializeCartForUser: (userId: string | null | undefined) => void;
};

export const useCartStore = create<CartState & CartActions>()(
    persist(
        (set, get) => ({
            items: [],
            _hasHydrated: false,

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
                    set({ items: [...currentItems, { product, quantity: 1 }] });
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

            initializeCartForUser: (userId) => {
                const newStorageKey = userId
                    ? `cart-storage-${userId}`
                    : 'cart-storage-guest';

                const persistAPI = (get() as any).persist;

                persistAPI.setOptions({
                    name: newStorageKey,
                });

                persistAPI.rehydrate();
            },
        }),
        {
            name: 'cart-storage-guest',
            storage: createJSONStorage(() => localStorage),

            partialize: (state) => ({
                items: state.items,
            }),

            onRehydrateStorage: () => {
                return (state, error) => {
                    if (error) {
                        console.error(
                            'An error happened during hydration',
                            error
                        );
                    } else {
                        setTimeout(() => {
                            useCartStore.setState({ _hasHydrated: true });
                        }, 0);
                    }
                };
            },
        }
    )
);
