import { cn } from '@/shared/lib/utils';
import { SquarePlay } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
    className?: string;
}

export const SocialMedia: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('border-b-2 border-gray-300 p-4', className)}>
            <h4 className="mb-2 text-gray-500">We in social media</h4>
            <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1&pp=ygUJcmljayByb2xsoAcB0gcJCc0JAYcqIYzv">
                <SquarePlay className="text-gray-300" width={30} height={30} />
            </Link>
        </div>
    );
};
