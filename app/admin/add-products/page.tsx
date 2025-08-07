'use client';
import { createProduct, getCategories } from '@/shared/actions';
import { Category } from '@prisma/client';
import React, { FormEvent } from 'react';

export default function AddProductPage() {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = React.useState('');
    const inputFileRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        async function fetchCategories() {
            const AllCategories = await getCategories();
            setCategories(AllCategories);
        }
        fetchCategories();
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
        }
        const file = inputFileRef.current.files[0];

        console.log('Uploading file to Vercel Blob...');
        const response = await fetch(`/api/upload?filename=${file.name}`, {
            method: 'POST',
            body: file,
        });
        const newBlob = await response.json();
        console.log('File uploaded. URL:', newBlob.url);

        try {
            console.log('Creating product in database...');
            await createProduct({
                name,
                description,
                price: parseFloat(price),
                imageUrl: newBlob.url,
                categoryId: parseInt(selectedCategoryId, 10),
            });

            alert('Product created successfully!');
            setName('');
            setDescription('');
            setPrice('');
            if (inputFileRef.current) {
                inputFileRef.current.value = '';
            }
        } catch (error) {
            console.error('Failed to create product:', error);
            alert('Error creating product. See console for details.');
        }
    };

    return (
        <div className="">
            <form
                onSubmit={handleSubmit}
                className="my-10 flex max-w-md flex-col gap-4 border-2 p-4"
            >
                <input
                    type="text"
                    placeholder="Name of product"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description of product"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price of product"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="rounded border p-2"
                    required
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <input type="file" ref={inputFileRef} required />

                <button type="submit">add product</button>
            </form>
        </div>
    );
}
