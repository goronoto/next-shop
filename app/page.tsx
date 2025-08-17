import { getCategories, getProducts } from '@/shared/actions/index';
import {
    Container,
    ProductGroupe,
    Title,
    SocialMedia,
    RecommendedProduct,
    CategoriesList,
    ColumLinks,
} from '@/shared/components/shared';
import { LINK_COLUMN } from '@/shared/constants/site-links';
import { cn } from '@/shared/lib/utils';
import React from 'react';

export default async function HomePage() {
    const [categories, products] = await Promise.all([
        getCategories(),
        getProducts(),
    ]);

    return (
        <div className={cn('')}>
            <Container className="flex items-start">
                {/*SIDEBAR*/}
                <div className="sticky top-20 flex-col border-b-2 border-gray-300">
                    <CategoriesList categories={categories} />
                    <SocialMedia />
                    <div className="p-4">
                        {LINK_COLUMN.map((column) => (
                            <ColumLinks
                                isSideBar={true}
                                className=""
                                key={column.title}
                                column={{
                                    title: column.title,
                                    links: column.links,
                                }}
                            ></ColumLinks>
                        ))}
                    </div>
                </div>
                {/*PRODUCTS*/}
                <div className="flex-1 overflow-hidden border-l-2 border-gray-300 pl-10">
                    <Title
                        className="mb-5 mt-10"
                        text={'Recommended base on you searching'}
                        size="md"
                    />
                    <RecommendedProduct
                        className="mb-10"
                        isRecommended={true}
                        products={products}
                    />
                    <Title text="More Products" size="md" />
                    <ProductGroupe products={products} />
                </div>
            </Container>
        </div>
    );
}
