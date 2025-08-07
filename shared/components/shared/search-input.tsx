'use client';
import React from 'react';
import { Input, Button } from '../index';
import { Search } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useDebounce } from '@uidotdev/usehooks';
import Link from 'next/link';
import { ProductWithCategory } from '@/shared/types/safe-products-type';

interface Props {
    className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState<ProductWithCategory[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const debouncedQuery = useDebounce(query, 300);

    React.useEffect(() => {
        if (debouncedQuery.trim() !== '') {
            setIsLoading(true);

            fetch(`/api/search?q=${debouncedQuery}`)
                .then((res) => res.json())
                .then((data) => {
                    setResults(data);
                })
                .catch((err) => {
                    console.error('Помилка живого пошуку:', err);
                    setResults([]);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setResults([]);
        }
    }, [debouncedQuery]);

    const handleClose = () => {
        setQuery('');
        setResults([]);
    };

    const isSearchActive = query.length > 0;

    return (
        <div className={cn('relative w-full', className)}>
            <form
                action="/search"
                method="GET"
                className="relative z-20 flex flex-1"
            >
                <Search className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                    name="q"
                    className="border-none bg-gray-100 pl-10"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoComplete="off"
                />
                <Button className="absolute right-1 top-1/2 h-8 -translate-y-1/2 bg-rozetka-green">
                    Search
                </Button>
            </form>

            {results.length > 0 && !isLoading && (
                <div className="absolute left-0 top-full z-30 mt-1 w-full rounded-md border bg-white shadow-lg">
                    <ul>
                        {results.map((product) => (
                            <li
                                key={product.id}
                                className="border-b last:border-b-0"
                            >
                                <Link
                                    href={`/product/${product.id}`}
                                    className="flex items-center gap-4 p-2 hover:bg-gray-100"
                                    onClick={handleClose}
                                >
                                    <span>{product.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {isLoading && (
                <div className="absolute left-0 top-full z-30 mt-1 w-full rounded-md border bg-white p-4 text-center shadow-lg">
                    <p>loading...</p>
                </div>
            )}

            {isSearchActive && (
                <div
                    className="fixed inset-0 z-10 bg-black bg-opacity-50"
                    onClick={handleClose}
                />
            )}
        </div>
    );
};
