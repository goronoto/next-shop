'use client';

import { useCartStore } from '@/shared/store/cart-store';
import { useSession } from 'next-auth/react';
import React from 'react';

const selectedPersistedUserId = (
    state: ReturnType<typeof useCartStore.getState>
) => state.userId;
const selectedSetUserId = (state: ReturnType<typeof useCartStore.getState>) =>
    state.setUserId;
const selectedClearCart = (state: ReturnType<typeof useCartStore.getState>) =>
    state.clearCart;

export const CartSessionManager = () => {
    const { data: session, status } = useSession();
    const persistedUserId = useCartStore(selectedPersistedUserId);
    const setUserId = useCartStore(selectedSetUserId);
    const clearCart = useCartStore(selectedClearCart);

    React.useEffect(() => {
        if (status === 'loading') {
            return;
        }

        const currentUserId = session?.user?.id ?? null;

        if (persistedUserId !== currentUserId) {
            console.log('User changed. Clearing cart.');
            clearCart();
        }

        setUserId(currentUserId);
    }, [status, session?.user?.id, persistedUserId, setUserId, clearCart]);

    return null;
};

export default CartSessionManager;
