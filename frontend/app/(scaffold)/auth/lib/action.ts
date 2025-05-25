import { signIn } from "next-auth/react";

import type { LoginSchema, RegisterSchema } from "./schema";
import ApiClient from "@/lib/api";
import { AxiosError } from "axios";

export interface AuthError {
    error: {
        message: string;
        name: string;
    }
}

export const login = async (data: LoginSchema) => {
    await signIn("credentials", {
        ...data,
        redirectTo: "/home"
    });
}

export const register = async (data: RegisterSchema) => {
    const apiClient = new ApiClient();

    try {
        const response = await apiClient.instance.post("/register", {
            data: {
                ...data,
            }
        });

        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && isAuthError(error.response?.data)) {
            throw error.response?.data;
        }

        throw {
            error: {
                message: "An unexpected error occurred. Please try again later.",
                name: "UnexpectedError",
            },
        };
    }

}

export function isAuthError(error: unknown): error is AuthError {
    return (
        typeof error === "object" &&
        error !== null &&
        "error" in error &&
        typeof (error as AuthError).error === "object" &&
        (error as AuthError).error !== null &&
        "message" in (error as AuthError).error &&
        "name" in (error as AuthError).error
    );
}