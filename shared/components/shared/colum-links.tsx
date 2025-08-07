import { LinkColum } from '@/shared/constants/site-links';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import React from 'react';

interface Props {
    column: LinkColum;
    isSideBar?: boolean;
    className?: string;
}

export const ColumLinks: React.FC<Props> = ({
    isSideBar = false,
    className,
    column,
}) => {
    return (
        <div
            className={cn({
                'border-b-2 border-gray-200': isSideBar,
                className,
            })}
        >
            <h4 className="my-2">{column.title}</h4>
            <ul className="mb-4 flex flex-col gap-2">
                {column.links.map((link) => (
                    <li key={link.text}>
                        <Link
                            className="text-gray-400 transition-colors hover:text-rozetka-green hover:underline"
                            href={link.href}
                        >
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
