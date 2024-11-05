import { z } from 'zod';

export const registerSchema = z.object({
    name: z
        .string()
        .min(3, "Username must have at least 3 characters!")
        .max(20, "Username must not exceed 20 characters!"),
    email: z
        .string().email("Invalid email format!"),
    password: z
        .string()
        .min(8, "Must have at least 8 characters!")
        .max(100, "Password is too long!"),
    confirmPassword: z
        .string()
        .min(8, "Must have at least 8 characters!"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match!",
    path: ["confirmPassword"], // menandai field `confirmPassword` jika tidak cocok
});


export const loginSchema = z.object({
    email: z
        .string()
        .email("Invalid email format!"),
    password: z
        .string()
        .min(8, "Password must have at least 8 characters"),
});