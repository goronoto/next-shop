import { searchProducts } from '@/shared/actions';
import { ProductWithCategory } from '@/shared/types/safe-products-type';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const query = searchParams.get('q');

        if (!query) {
            return NextResponse.json(
                { message: 'Search query is required' },
                { status: 400 }
            );
        }

        const products: ProductWithCategory[] = await searchProducts(query, {
            take: 7,
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('[API_SEARCH_ERROR]', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
