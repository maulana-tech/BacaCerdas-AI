declare global {
    enum Role {
        SISWA = "STUDENT",
        GURU = "TEACHER",
        ROOT = "ROOT"
    }
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_OUTPUT?: "standalone" | "export";
            NEXT_PUBLIC_API_URL?: string;
            AZUREI_OPENAI_BASE_URL?: string;
            AZURE_OPENAI_DEPLOYMENT_NAME?: string
            AZURE_OPENAI_RESOURCE_NAME?: string;
            AZURE_OPENAI_API_KEY?: string;
        }
    }

    interface DefaultPageProps {
        children: React.ReactNode;
    }
}

// Don't remove this line, it is required for TypeScript.
export { };