import {
    Footer,
    Header,
    ScrollToTopBtn,
} from '@/shared/components/shared/index';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import {
    AuthProvider,
    CartSessionManager,
} from '@/shared/components/shared/providers';
import { SessionProvider } from 'next-auth/react';

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
                <AuthProvider>
                    <CartSessionManager />
                    <Toaster />
                    <Header />
                    <main>{children}</main>
                    <Footer />
                    <ScrollToTopBtn />
                </AuthProvider>
            </body>
        </html>
    );
}
