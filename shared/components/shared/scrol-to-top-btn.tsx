'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { ArrowUp } from 'lucide-react';

interface Props {
    className?: string;
}

export const ScrollToTopBtn: React.FC<Props> = ({ className }) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const lastScrollY = React.useRef(0);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    React.useEffect(() => {
        // Функція, що буде викликатися при кожному скролі
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Умова 1: Кнопка з'являється, якщо ми проскролили вниз більше, ніж на 400px
            const shouldBeVisibleOnScrollDown = currentScrollY > 400;

            // Умова 2: Кнопка з'являється, якщо ми почали скролити вгору
            // (поточна позиція менша за попередню)
            const isScrollingUp = currentScrollY < lastScrollY.current;

            // Показуємо кнопку, якщо виконується хоча б одна з умов
            // і ми не на самому верху сторінки
            if (
                (shouldBeVisibleOnScrollDown || isScrollingUp) &&
                currentScrollY > 0
            ) {
                setIsVisible(true);
            } else {
                // Ховаємо, якщо ми нагорі або скролимо вниз на малій відстані
                if (currentScrollY < 100) {
                    setIsVisible(false);
                }
            }

            // Оновлюємо останню позицію скролу
            lastScrollY.current = currentScrollY;
        };

        // Додаємо слухача події при монтуванні компонента
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Обов'язково прибираємо слухача при демонтуванні компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Button
            size="icon"
            onClick={scrollToTop}
            // Використовуємо cn для умовного додавання класів
            className={cn(
                'fixed bottom-4 right-4 z-50 rounded-full bg-rozetka-green transition-opacity duration-300 hover:bg-green-400',
                // Кнопка прозора, якщо isVisible = false
                isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
            // Додатково можна використовувати aria-hidden для доступності
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
        >
            <ArrowUp className="h-5 w-5" />
        </Button>
    );
};
