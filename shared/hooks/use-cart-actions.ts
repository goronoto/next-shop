import { toast } from 'react-hot-toast';
import {
    clearCart,
    deleteCartItem,
    updateCartItemQuantity,
} from '@/shared/actions/cart-actions';
import { useCartStore } from '../store/cart-store';
import { useCallback } from 'react';

const selectClearCart = (state: ReturnType<typeof useCartStore.getState>) =>
    state.clearCart;

const selectIsLoading = (state: ReturnType<typeof useCartStore.getState>) =>
    state.isLoading;

const selectSetIsLoading = (state: ReturnType<typeof useCartStore.getState>) =>
    state.setIsLoading;

const selectSetItems = (state: ReturnType<typeof useCartStore.getState>) =>
    state.setItems;

const selectUserId = (state: ReturnType<typeof useCartStore.getState>) =>
    state.userId;

const selectRemoveItem = (state: ReturnType<typeof useCartStore.getState>) =>
    state.removeItem;

const selectUpdateItemQuantity = (
    state: ReturnType<typeof useCartStore.getState>
) => state.updateQuantity;

export function useCartActions() {
    const clearCART = useCartStore(selectClearCart);
    const isLoading = useCartStore(selectIsLoading);
    const setIsLoading = useCartStore(selectSetIsLoading);
    const setItems = useCartStore(selectSetItems);
    const userId = useCartStore(selectUserId);
    const removeItem = useCartStore(selectRemoveItem);
    const updateItemQuantity = useCartStore(selectUpdateItemQuantity);

    const handleClearCart = useCallback(async () => {
        setIsLoading(true);

        if (userId) {
            try {
                await clearCart();
                clearCART();
                toast.success('Cart cleared');
            } catch (error) {
                console.log('Failed to clear cart:', error);
                toast.error('Could not clear cart');
            }
        } else {
            clearCART();
            toast.success('Cart cleared');
        }

        setIsLoading(false);
    }, [clearCART, setIsLoading, userId]);

    const handleDeleteCartItem = useCallback(
        async (cartItemId: string) => {
            setIsLoading(true);

            if (userId) {
                try {
                    const DeleteCartItem = await deleteCartItem(cartItemId);

                    const newItem = DeleteCartItem?.items.map((item) => ({
                        product: {
                            ...item.product,
                            price: item.product.price.toString(),
                            createdAt: item.product.createdAt.toISOString(),
                            updatedAt: item.product.updatedAt.toISOString(),
                        },
                        quantity: item.quantity,
                        cartItemId: item.id,
                    }));

                    if (!newItem) throw new Error('No items found');

                    setItems(newItem);
                    toast.success('Cart item deleted');
                } catch (error) {
                    console.log('Failed to delete cart item:', error);
                    toast.error('Could not delete cart item');
                }
            } else {
                try {
                    removeItem(cartItemId);
                    toast.success('Cart item deleted');
                } catch {
                    toast.error('Could not delete cart item');
                }
            }

            setIsLoading(false);
        },
        [removeItem, setIsLoading, setItems, userId]
    );

    const handleUpdateQuantity = useCallback(
        async (cartItemId: string, quantity: number) => {
            setIsLoading(true);

            if (userId) {
                try {
                    const UpdateCartItemQuantity = await updateCartItemQuantity(
                        cartItemId,
                        quantity
                    );

                    const newItem = UpdateCartItemQuantity?.items.map(
                        (item) => ({
                            product: {
                                ...item.product,
                                price: item.product.price.toString(),
                                createdAt: item.product.createdAt.toISOString(),
                                updatedAt: item.product.updatedAt.toISOString(),
                            },
                            quantity: item.quantity,
                            cartItemId: item.id,
                        })
                    );

                    if (!newItem) throw new Error('No items found');

                    setItems(newItem);
                    toast.success('Quantity updated');
                } catch (error) {
                    console.log('Failed to update quantity:', error);
                    toast.error('Could not update quantity');
                }
            } else {
                try {
                    updateItemQuantity(cartItemId, quantity);
                    toast.success('Quantity updated');
                } catch {
                    toast.error('Could not update quantity');
                }
            }

            setIsLoading(false);
        },
        [updateItemQuantity, setIsLoading, setItems, userId]
    );

    return { handleClearCart, handleDeleteCartItem, handleUpdateQuantity };
}
