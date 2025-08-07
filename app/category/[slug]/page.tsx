import { getCategoryPageData } from '@/shared/actions';
import {
    CategoryHeader,
    Container,
    ProductGroupe,
} from '@/shared/components/shared';
import { notFound } from 'next/navigation';
import React from 'react';

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;

    const Pagedata = await getCategoryPageData(slug);

    if (!Pagedata) {
        notFound();
    }

    const { category, products } = Pagedata;

    return (
        <Container className="">
            <CategoryHeader category={category} />

            <hr className="mt-8" />

            <ProductGroupe products={products} />
        </Container>
    );
}
