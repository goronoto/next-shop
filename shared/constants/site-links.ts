type LinkItem = {
    text: string;
    href: string;
};

export type LinkColum = {
    title: string;
    links: LinkItem[];
};

export const LINK_COLUMN: LinkColum[] = [
    {
        title: 'Інформація про компанію',
        links: [
            { text: 'Про нас', href: '/' },
            { text: 'Умови використання сайту', href: '/' },
            { text: 'Вакансії', href: '/' },
            { text: 'Контакти', href: '/' },
            { text: 'Всі категорії', href: '/' },
        ],
    },
    {
        title: 'Допомога',
        links: [
            { text: 'Доставка та оплата', href: '/' },
            { text: 'Кредит', href: '/' },
            { text: 'Гарантія', href: '/' },
            { text: 'Повернення товару', href: '/' },
            { text: 'Сервісні центри', href: '/' },
        ],
    },
    {
        title: 'Сервіси',
        links: [
            { text: 'Бонусний рахунок', href: '/' },
            { text: 'Подарункові сертифікати', href: '/' },
            { text: 'Rozetka Обмін', href: '/' },
            { text: 'Корпоративним клієнтам', href: '/' },
        ],
    },
    {
        title: 'Партнерам',
        links: [
            { text: 'Продавати на Розетці', href: '/' },
            { text: 'Співпраця з нами', href: '/' },
            { text: 'Франчайзинг', href: '/' },
            { text: 'Оренда приміщень', href: '/' },
        ],
    },
];
