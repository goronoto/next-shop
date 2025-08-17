'use client';
import Image from 'next/image';
import React from 'react';
import {
    CartSheet,
    Catalog,
    CatalogContent,
    Container,
    HeaderIcons,
    SearchInput,
} from './index';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const [isCatalogOpen, setIsCatalogOpen] = React.useState(false);
    return (
        <header
            className={cn(
                'sticky top-0 z-50 h-20 w-full bg-rozetka-black p-5',
                className
            )}
        >
            <Container className="flex items-center justify-between gap-5">
                {/*LOGO*/}
                <div className="">
                    <Link href="/">
                        <Image
                            src="/555588633.svg"
                            alt="logo"
                            width={40}
                            height={40}
                        />
                    </Link>
                </div>

                {/*CATALOG*/}
                <Dialog open={isCatalogOpen} onOpenChange={setIsCatalogOpen}>
                    <DialogTrigger asChild>
                        <Catalog isOpen={isCatalogOpen} />
                    </DialogTrigger>
                    <DialogContent className="w-[80%] max-w-none bg-white p-0">
                        <DialogTitle className="sr-only">
                            Product Catalog
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Chose a Category and a Product in Catalog
                        </DialogDescription>
                        <CatalogContent
                            onClose={() => setIsCatalogOpen(false)}
                        />
                    </DialogContent>
                </Dialog>

                {/*SEARCH BAR*/}
                <SearchInput />

                <CartSheet />

                {/*USER ICONS*/}
                <HeaderIcons />
            </Container>
        </header>
    );
};
