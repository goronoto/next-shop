'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { UserIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const UserNav = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
        );
    }
    if (status === 'unauthenticated') {
        return (
            <Link href="/register">
                <Button
                    variant="ghost"
                    className="text-white hover:text-black"
                    size="icon"
                >
                    <UserIcon className="h-10 w-10" />
                </Button>
            </Link>
        );
    }

    if (status === 'authenticated') {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={session.user?.image || undefined} />
                        <AvatarFallback>
                            {session.user.name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My account</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href={'/profile'}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                        SignOut
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
};
