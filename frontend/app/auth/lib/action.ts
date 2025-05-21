import { signIn } from "next-auth/react";

import type { LoginSchema } from "./schema";

export const login = async (data: LoginSchema) => {
    await signIn("credentials", {
        ...data,
        redirectTo: "/dashboard"
    });
}