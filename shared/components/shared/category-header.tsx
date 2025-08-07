import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
    className?: string;
    category: {
        name: string;
        description: string | null;
    };
}

export const CategoryHeader: React.FC<Props> = ({ className, category }) => {
    return (
        <div
            className={cn(
                'mt-4 flex w-full flex-col items-center gap-2 rounded-md bg-gray-200 p-2',
                className
            )}
        >
            <div className="">
                <h1 className="text-3xl">{category?.name}</h1>
            </div>
            <p className="text-lg text-gray-600">{category?.description}</p>
        </div>
    );
};
