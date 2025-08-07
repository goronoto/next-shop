import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { SafeProduct, SafeProducts } from '@/shared/types/safe-products-type';
import { Button } from '../ui';

interface ProductCardProps {
    product: SafeProducts | SafeProduct;
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
        // 1. Загальний контейнер картки. `h-full` та `flex-col` є ключовими,
        // щоб картка займала всю висоту батьківського flex-контейнера
        // і її внутрішні елементи можна було гнучко розташовувати по вертикалі.
        <div
            className={cn(
                'group relative z-10 flex h-full w-[230px] flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg',
                className
            )}
        >
            {/* Блок зображення */}
            <div className="relative h-48 w-full bg-gray-100">
                <Link href={`/product/${id}`}>
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
                {isRecommended ? (
                    <span className="absolute left-2 top-2 rounded-full bg-rozetka-green px-2 py-1 text-xs text-white">
                        {category.name}
                    </span>
                ) : (
                    ''
                )}
            </div>

            {/* Блок контенту: `flex-1` та `flex-col` дозволяють цьому блоку
                зайняти весь доступний простір, що залишився, і розташувати
                свої дочірні елементи вертикально. */}
            <div className="flex flex-1 flex-col p-4">
                {/* Назва товару.
                    `flex-grow` змушує цей блок рости, відштовхуючи рейтинг і футер вниз.
                    Це гарантує, що футери всіх карток будуть на одній лінії. */}
                <div className="flex-grow">
                    <h3 className="mb-2 text-base font-semibold text-gray-800">
                        <Link
                            href={`/product/${id}`}
                            // ЗАСТОСОВУЄМО ОБМЕЖЕННЯ КІЛЬКОСТІ РЯДКІВ
                            // `line-clamp-2` обріже текст до двох рядків, додавши "..." в кінці.
                            // Для цього потрібен плагін `@tailwindcss/line-clamp`.
                            // Якщо ви хочете обрізати до одного рядка, використовуйте клас `truncate`.
                            className="text-wrap hover:text-rozetka-green hover:underline"
                        >
                            {name}
                        </Link>
                    </h3>
                </div>

                {/* Рейтинг */}
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

                {/* Футер картки: `mt-auto` тут вже не потрібен, оскільки `flex-grow`
                    на блоці з назвою виконує цю роботу ефективніше. */}
                <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-green-500">
                        {parseFloat(price).toLocaleString('uk-UA')} грн
                    </p>
                    <Button size="icon" variant="outline" className="shrink-0">
                        <ShoppingCart className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
