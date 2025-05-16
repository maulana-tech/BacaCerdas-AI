declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_OUTPUT?: "standalone" | "export";
        }
    }
}

// Don't remove this line, it is required for TypeScript.
export { };