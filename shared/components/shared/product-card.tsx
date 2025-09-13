import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { SafeProduct, SafeProducts } from '@/shared/types/safe-products-type';
import { Button } from '../ui';
import { AddToCartBtn } from './add-to-cart-btn';

interface ProductCardProps {
    product: SafeProduct;
    className?: string;
    isRecommended?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    className,
    isRecommended,
}) => {
    const { id, name, price, imageUrl, category } = product;
    const rating = 4.5;

    return (
        <div
            className={cn(
                'group relative z-10 flex h-full w-[230px] flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg',
                className
            )}
        >
            <div className="relative h-48 w-full bg-gray-100">
                <Link href={`/product/${id}`}>
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
                {isRecommended ? (
                    <span className="absolute left-2 top-2 rounded-full bg-rozetka-green px-2 py-1 text-xs text-white">
                        {category?.name}
                    </span>
                ) : (
                    ''
                )}
            </div>

            <div className="flex flex-1 flex-col p-4">
                <div className="flex-grow">
                    <h3 className="mb-2 text-base font-semibold text-gray-800">
                        <Link
                            href={`/product/${id}`}
                            className="text-wrap hover:text-rozetka-green hover:underline"
                        >
                            {name}
                        </Link>
                    </h3>
                </div>

                <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                'h-4 w-4',
                                i < Math.round(rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                            )}
                        />
                    ))}
                    <span className="ml-2 text-xs text-gray-500">
                        ({rating.toFixed(1)})
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-green-500">
                        {parseFloat(price).toLocaleString('uk-UA')} грн
                    </p>
                    <AddToCartBtn product={product} />
                </div>
            </div>
        </div>
    );
};
