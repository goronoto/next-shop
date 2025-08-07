import {
    Footer,
    Header,
    ScrollToTopBtn,
} from '@/shared/components/shared/index';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${GeistSans.variable} ${GeistMono.variable}`}
        >
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
                <ScrollToTopBtn />
            </body>
        </html>
    );
}
