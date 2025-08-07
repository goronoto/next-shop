'use client';
import React from 'react';
import { Boxes, X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Props {
    className?: string;
    isOpen?: boolean;
}

export const Catalog = React.forwardRef<HTMLButtonElement, Props>(
    ({ className, isOpen, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-md border-2 border-white p-2 text-white hover:bg-gray-500',
                    className
                )}
                {...props}
            >
                {isOpen ? <X /> : <Boxes />}
                <h3>CATALOG</h3>
            </button>
        );
    }
);

Catalog.displayName = 'Catalog';
