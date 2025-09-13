'use server';

import { auth } from '@/shared/lib/auth-config';
import { prisma } from '@/shared/lib/prisma';

export async function getUserId() {
    const session = await auth();

    const userId = session.user?.id;

    if (!userId) {
        throw new Error('User not authenticated');
    }

    return userId;
}

export async function getOrCreateUserCart() {
    const userId = await getUserId();

    if (userId === null) {
        throw new Error('User not authenticated');
    }

    const userCart = await prisma?.cart.upsert({
        where: {
            userId: userId,
        },
        update: {},
        create: {
            userId: userId,
        },
    });

    if (userCart) {
        return userCart;
    } else {
        throw new Error('Could not create or get user cart');
    }
}

export async function getUserCart() {
    const userId = await getUserId();

    const userCart = await prisma.cart.findFirst({
        where: {
            userId: userId,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    return userCart;
}

export async function addToCart(productId: number) {
    const userCart = await getOrCreateUserCart();

    if (!userCart) {
        throw new Error('Could not get or create user cart');
    }

    const existingCartItem = await prisma?.cartItem.findFirst({
        where: {
            productId,
            cartId: userCart.id,
        },
    });

    if (existingCartItem) {
        await prisma?.cartItem.update({
            where: {
                id: existingCartItem.id,
            },
            data: {
                quantity: existingCartItem.quantity + 1,
            },
        });
    } else {
        await prisma?.cartItem.create({
            data: {
                cartId: userCart.id,
                productId,
                quantity: 1,
            },
        });
    }

    return await getUserCart();
}

export async function deleteCartItem(cartItemId: string) {
    const userCart = await getOrCreateUserCart();

    const existingCartItem = await prisma.cartItem.findUnique({
        where: {
            id: cartItemId,
        },
    });

    if (!existingCartItem) throw new Error('Cart item not found');

    if (existingCartItem?.cartId !== userCart.id) {
        throw new Error('Cart item does not belong to user cart');
    }

    await prisma.cartItem.delete({
        where: {
            id: cartItemId,
        },
    });

    return await getUserCart();
}

export async function clearCart() {
    const userCart = await getOrCreateUserCart();

    await prisma.cartItem.deleteMany({
        where: {
            cartId: userCart.id,
        },
    });

    return await getUserCart();
}

export async function updateCartItemQuantity(
    cartItemId: string,
    quantity: number
) {
    const userCart = await getOrCreateUserCart();

    const existingCartItem = await prisma.cartItem.findUnique({
        where: {
            id: cartItemId,
        },
    });

    if (!existingCartItem) throw new Error('Cart item not found');

    if (existingCartItem?.cartId !== userCart.id) {
        throw new Error('Cart item does not belong to user cart');
    }

    if (quantity <= 0) {
        await prisma.cartItem.delete({
            where: {
                id: cartItemId,
            },
        });
    } else {
        await prisma.cartItem.update({
            where: {
                id: cartItemId,
            },
            data: {
                quantity,
            },
        });
    }

    return await getUserCart();
}
