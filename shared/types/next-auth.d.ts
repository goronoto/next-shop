import { Role } from '@prisma/client';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        role: Role;
        id: string;
    }
}

declare module 'next-auth' {
    interface User extends DefaultUser {
        role: Role;
    }

    interface Session {
        user: {
            id: string;
            role: Role;
        } & DefaultSession['user'];
    }
}
