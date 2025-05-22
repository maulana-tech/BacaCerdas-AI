import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = {
    login:
        z.object({
            identifier: z.string().min(3, 'Username minimal 3 karakter'),
            password: z.string().min(6, 'Password must be at least 6 characters long'),
            role: z.enum(['STUDENT', 'TEACHER'])
        }),
    register:
        z.object({
            name: z.string().min(3, 'Name must be at least 3 characters long'),
            email: z.string().email('Invalid email address'),
            password: z.string().min(6, 'Password must be at least 6 characters long'),
            confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
        })
            .refine((data) => data.password === data.confirmPassword, {
                message: "Passwords don't match"
            }),
}

export type LoginSchema = z.infer<typeof schema.login>;
export type RegisterSchema = z.infer<typeof schema.register>;

export const loginResolver = zodResolver(schema.login);