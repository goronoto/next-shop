'use client';

import { useCartStore } from '@/shared/store/cart-store';
import { useSession } from 'next-auth/react';
import React, { FC, useRef } from 'react';

export const CartSessionManager = () => {
    const { data: session, status } = useSession();
    const userId = session?.user.id;
    const initializeCartForUser = useCartStore(
        (state) => state.initializeCartForUser
    );
    const _hasHydrated = useCartStore((state) => state._hasHydrated);

    React.useEffect(() => {
        if (!_hasHydrated) {
            return;
        }
        console.log('Session status', status);

        if (status === 'authenticated') {
            console.log(`User is registered ID:${userId}`);

            initializeCartForUser(userId);
        }

        if (status === 'unauthenticated') {
            console.log('User is not registered (guest)');

            initializeCartForUser(null);
        }
    }, [status, userId, initializeCartForUser, _hasHydrated]);

    return null;
};

export default CartSessionManager;
