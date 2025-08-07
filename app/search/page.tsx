import { searchProducts } from '@/shared/actions';
import { Container, ProductGroupe, Title } from '@/shared/components/shared';
import { SafeProduct } from '@/shared/types/safe-products-type';

interface SearchPageProps {
    searchParams: {
        q?: string;
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = searchParams.q;

    if (!query) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h1 className="text-2xl font-bold">Search Page</h1>
                <p className="mt-4">
                    Enter something in search input to found something
                </p>
            </div>
        );
    }

    const foundProducts = await searchProducts(query);

    const safeProducts = foundProducts.map((product) => ({
        ...product,
        price: product.price.toString(),
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        category: {
            ...product.category,
        },
    }));

    return (
        <Container>
            <h1 className="text-3xl font-bold">
                Результати пошуку для:{' '}
                <span className="text-rozetka-green">"{query}"</span>
            </h1>
            <div className="mt-5">
                {safeProducts.length !== 0 ? (
                    <ProductGroupe
                        className="mb-10 border-t-2 border-gray-300 pt-10"
                        products={safeProducts}
                    />
                ) : (
                    <p className="my-4 flex justify-center text-2xl">
                        We didnt found anything ;(
                    </p>
                )}
            </div>
        </Container>
    );
}
