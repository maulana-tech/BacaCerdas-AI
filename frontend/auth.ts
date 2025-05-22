import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google"

import type { Provider } from "next-auth/providers"
import ApiClient from "./lib/api"

// Don't remove this line, unless you want to break TypeScript.
import type { JWT } from "next-auth/jwt"
import { AxiosError } from "axios"

/** 
 * ref: https://authjs.dev/getting-started/typescript#module-augmentation
 * */
declare module "next-auth" {
    interface User {
        id: string,
        email: string,
        username: string,
        name: string,
        // role: ,
        image?: string,
        location?: string,
        createdAt: Date,
        updatedAt: Date,
        token: string
    }

    interface Session {
        id: string,
        email: string,
        username: string,
        name: string,
        // role: ,
        image?: string,
        location?: string,
        createdAt: Date,
        updatedAt: Date,
        token: string
    }
}

/** 
 * ref: https://authjs.dev/getting-started/typescript#module-augmentation
 * */
declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        email: string,
        username: string,
        name: string,
        // role: ,
        image?: string,
        location?: string,
        createdAt: Date,
        updatedAt: Date,
        token: string
    }
}

/**
 * ref: https://authjs.dev/reference/core/providers/credentials#examples
 */
class InvalidCredentialsError extends CredentialsSignin {
    code = "Invalid Credential"
}

const providers: Provider[] = [
    // GoogleProvider({}),
    Credentials({
        credentials: {
            identifier: {
                type: "text"
            },
            password: {
                type: "password"
            },
            role: {
                type: "text"
            }
        },
        async authorize(credentials, req) {
            const { identifier, password, role } = credentials;

            const apiClient = new ApiClient();

            try {
                const response = await apiClient
                    .instance
                    .post("/login", {
                        data: {
                            identifier,
                            password,
                            role
                        }
                    });

                const user = response.data.data;

                return user;
            } catch (error) {
                throw new InvalidCredentialsError()
            }
        }
    })
]


export const { handlers, signIn, signOut, auth } = NextAuth(() => {

    return {
        providers,
        pages: {
            signIn: "/auth/login",
        },
        callbacks: {

            jwt: async ({ token, user }) => {
                if (user) {
                    token = {
                        ...user,
                    }
                }

                return token;
            }
        }
    }

})