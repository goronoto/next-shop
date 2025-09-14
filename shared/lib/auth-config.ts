import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';
import bcrypt from 'bcryptjs';
import { LoginSchema } from './auth';
import { getUserByEmail } from '../actions';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);

                    if (!user || !user.password) {
                        return null;
                    }

                    const isPasswordValid = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (isPasswordValid) {
                        return user;
                    }
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as 'USER' | 'ADMIN';
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
                token.role = user.role;
                return token;
            }

            if (!token.role) {
                const dbUser = await db.user.findUnique({
                    where: { id: token.id as string },
                });
                if (dbUser) {
                    token.role = dbUser.role;
                }
            }
            return token;
        },
    },
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
});
