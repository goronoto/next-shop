import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const categoriesData = [
    {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Different electronic for different tasks',
    },
    {
        name: 'Books',
        slug: 'books',
        description: 'Food for your brain',
    },
    {
        name: 'Clothes',
        slug: 'clothing',
        description: 'Heaven for fashion lovers',
    },
    {
        name: 'Home and Garden',
        slug: 'home-garden',
        description: 'Make your house more comfy',
    },
];

async function main() {
    console.log('Start seeding...');

    console.log('Deleting old data...');
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    console.log('Old data deleted.');

    console.log('Creating categories...');
    await prisma.category.createMany({
        data: categoriesData,
    });
    console.log(`Created ${categoriesData.length} categories.`);

    console.log(
        'Seeding finished. Base entities (like categories) are created.'
    );
    console.log('Now you can add products manually via the admin panel.');
}

main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
