import { Laptop, Book, Shirt, Home } from 'lucide-react';
import React from 'react';

export const CATEGORY_ICONS: { [key: string]: React.ElementType } = {
    electronics: Laptop,
    books: Book,
    clothing: Shirt,
    'home-garden': Home,
    default: Home,
};
