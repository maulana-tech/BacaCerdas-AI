import NextAuth, { CredentialsSignin, type DefaultSession, type User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google"

import type { Provider } from "next-auth/providers"
import ApiClient from "./lib/api"

// Don't remove this line, unless you want to break TypeScript.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { JWT } from "next-auth/jwt"

/** 
 * ref: https://authjs.dev/getting-started/typescript#module-augmentation
 * */
declare module "next-auth" {
    interface User {
        id: string,
        email: string,
        username: string,
        name: string,
        role: Role,
        image?: string,
        location?: string,
        createdAt: Date,
        updatedAt: Date,
        token: string
    }

    interface Session {
        user: User & DefaultSession["user"]
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
        role: Role,
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async authorize(credentials, req) {
            const { identifier, password, role } = credentials;

            const apiClient = new ApiClient();

            try {
                const response = await apiClient
                    .instance
                    .post<{
                        data: {
                            attributes: User
                        }
                    }>("/login", {
                        data: {
                            identifier,
                            password,
                            role
                        }
                    });

                const user = response.data.data.attributes;

                return user;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            authorized: async ({ auth }) => {
                if (auth?.user) {
                    return true;
                }

                return false;
            },
            jwt: async ({ token, user }) => {
                if (user) {
                    token = {
                        ...user,
                    }
                }

                return token;
            },
            session: async ({ session, token }) => {
                if (token) {
                    session.user = {
                        ...session.user,
                        ...token,
                    }
                }

                return session;
            }
        }
    }

})