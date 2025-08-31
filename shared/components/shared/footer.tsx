import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './container';
import { LINK_COLUMN } from '@/shared/constants/site-links';
import { ColumLinks } from './colum-links';

interface Props {
    className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('mt-5 w-full', className)}>
            <div className="h-[5px] bg-rozetka-green">
                <Container className="pt-10">
                    <div className="flex items-center justify-between">
                        {LINK_COLUMN.map((column) => (
                            <ColumLinks
                                key={column.title}
                                column={{
                                    title: column.title,
                                    links: column.links,
                                }}
                            ></ColumLinks>
                        ))}
                    </div>
                </Container>
            </div>
        </div>
    );
};
