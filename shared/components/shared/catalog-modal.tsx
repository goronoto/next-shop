'use client';
import { getCategories, getProductsByCategoryId } from '@/shared/actions';
import { SafeProduct } from '@/shared/types/safe-products-type';
import { Category } from '@prisma/client';
import React from 'react';
import { Skeleton } from '../ui';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';

interface Props {
    onClose?: () => void;
}

export const CatalogContent: React.FC<Props> = ({ onClose }) => {
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [products, setProducts] = React.useState<SafeProduct[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<
        number | null
    >(null);

    const [isCategoriesLoading, setIsCategoriesLoading] = React.useState(true);
    const [isProductsLoading, setIsProductsLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchCategories = async () => {
            setIsCategoriesLoading(true);
            const data = await getCategories();
            setCategories(data);
            setIsCategoriesLoading(false);
        };
        fetchCategories();
    }, []);

    React.useEffect(() => {
        if (selectedCategoryId === null) {
            setProducts([]);
            return;
        }

        const fetchProducts = async () => {
            setIsProductsLoading(true);
            const data = await getProductsByCategoryId(selectedCategoryId);
            setProducts(data);
            setIsProductsLoading(false);
        };

        fetchProducts();
    }, [selectedCategoryId]);

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
    };
    return (
        <div className="z-50 flex h-[80vh]">
            {/*LEFT SIDE*/}
            <div className="w-1/4 overflow-y-auto border-r">
                <h2 className="sticky top-0 bg-white p-4 text-lg font-bold">
                    Categories
                </h2>
                {isCategoriesLoading ? (
                    <div className="space-y-2 p-4">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-8 w-full" />
                        ))}
                    </div>
                ) : (
                    <ul className="flex flex-col p-2">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <button
                                    onMouseOver={() =>
                                        handleCategoryClick(category.id)
                                    }
                                    className={cn(
                                        'w-full rounded-md p-2 text-left hover:bg-gray-100',
                                        {
                                            'bg-gray-200 font-semibold':
                                                selectedCategoryId ===
                                                category.id,
                                        }
                                    )}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/*RIGHT SIDE*/}
            <div className="flex-1 overflow-y-auto p-4">
                <h2 className="sticky -top-4 bg-white p-4 text-lg font-bold">
                    Products
                </h2>

                {isProductsLoading ? (
                    <div className="flex flex-col gap-4">
                        {[...Array(8)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                onClick={onClose}
                            >
                                <div className="border p-2">
                                    <p>{product.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
