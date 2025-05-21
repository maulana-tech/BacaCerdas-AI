declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_OUTPUT?: "standalone" | "export";
            NEXT_PUBLIC_API_URL?: string;
        }
    }

    interface DefaultPageProps {
        children: React.ReactNode;
    }
}

// Don't remove this line, it is required for TypeScript.
export { };