'use client';

import { LoginSchema, TLoginSchema } from '@/shared/lib/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import React from 'react';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Button, Input } from '../ui';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const LoginForm = () => {
    const [error, setError] = React.useState<string | undefined>('');
    const [isPending, startTransition] = React.useTransition();

    const form = useForm<TLoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { email: '', password: '' },
    });

    const router = useRouter();

    const onSubmit = (value: TLoginSchema) => {
        setError('');

        startTransition(() => {
            signIn('credentials', { ...value, redirect: false }).then(
                (data) => {
                    if (data?.ok) {
                        router.push('/');
                        router.refresh();
                    } else {
                        setError('Wrong email or password');
                    }
                }
            );
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/*EMAIL-FIELD*/}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="example@mail.com"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/*PASSWORD-FIELD*/}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    {...field}
                                    placeholder="********"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && <p className="text-red-500">{error}</p>}

                <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? 'Login...' : 'Login'}
                </Button>

                <Link href="/register">
                    <Button disabled={isPending} className="mt-5 w-full">
                        Create an account
                    </Button>
                </Link>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => signIn('google')}
                >
                    Google
                </Button>
            </form>
        </Form>
    );
};
