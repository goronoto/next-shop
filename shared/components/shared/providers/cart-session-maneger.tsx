'use client';

import { useCartStore } from '@/shared/store/cart-store';
import { useSession } from 'next-auth/react';
import React from 'react';

export const CartSessionManager = () => {
    const selectState = React.useCallback(
        (state: ReturnType<typeof useCartStore.getState>) => {
            return {
                persistedUserId: state.userId,
                setUserId: state.setUserId,
                clearCart: state.clearCart,
            };
        },
        []
    );
    const { data: session, status } = useSession();
    const { persistedUserId, setUserId, clearCart } = useCartStore(selectState);

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
