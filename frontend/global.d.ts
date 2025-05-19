declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_OUTPUT?: "standalone" | "export";
        }
    }

    interface DefaultPageProps {
        children: React.ReactNode;
    }
}

// Don't remove this line, it is required for TypeScript.
export { };