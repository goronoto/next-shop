import * as z from 'zod';

export const RegisterSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Your name should be at least 2 characters long' }),
    email: z.email({ message: 'Enter a valid E-mail' }),
    password: z
        .string()
        .min(8, { message: 'Password should contain at least 8 characters' }),
});

export const LoginSchema = z.object({
    email: z.email({ message: 'Enter a valid E-mail' }),
    password: z
        .string()
        .min(8, { message: 'Password should contain at least 8 characters' }),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
