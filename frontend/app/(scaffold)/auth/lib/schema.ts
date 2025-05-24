import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ROLE = z.enum(['STUDENT', 'TEACHER']);

const schema = {
    login:
        z.object({
            identifier: z.string().min(3, 'Username minimal 3 karakter'),
            password: z.string().min(6, 'Password must be at least 6 characters long'),
            role: ROLE
        }),
    register:
        z.object({
            username: z.string().min(3, 'Username minimal 3 karakter'),
            name: z.string().min(3, 'Name must be at least 3 characters long'),
            email: z.string().email('Invalid email address'),
            role: ROLE,
            password: z.string().min(6, 'Password must be at least 6 characters long'),
            confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
            acceptTerms: z.boolean().refine((val) => val === true, {
                message: "You must accept the terms and conditions"
            })
        })
            .refine((data) => data.password === data.confirmPassword, {
                message: "Passwords don't match"
            }),
}

export type LoginSchema = z.infer<typeof schema.login>;
export type RegisterSchema = z.infer<typeof schema.register>;

export const loginResolver = zodResolver(schema.login);
export const registerResolver = zodResolver(schema.register);