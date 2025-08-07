import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Category } from '@prisma/client';
import Link from 'next/link';
import { CATEGORY_ICONS } from '@/shared/constants/category-icon';

interface Props {
    categories: Category[];
    className?: string;
}

export const CategoriesList: React.FC<Props> = ({ categories, className }) => {
    return (
        <div
            className={cn(
                'w-[270px] border-b-2 border-gray-300 p-2',
                className
            )}
        >
            <ul className="flex flex-col gap-2">
                {categories.map((category) => {
                    const Icon =
                        CATEGORY_ICONS[category.slug] || CATEGORY_ICONS.default;

                    return (
                        <li
                            key={category.id}
                            className="text-rozetka-black hover:text-rozetka-green"
                        >
                            <Link
                                href={`/category/${category.slug}`}
                                className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-gray-100"
                            >
                                <Icon className="h-6 w-6" />
                                <span className="font-medium">
                                    {category.name}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
