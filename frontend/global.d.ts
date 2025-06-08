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
            NEXT_PUBLIC_BASE_URL?: string;
            AZURE_OPENAI_BASE_URL?: string;
            AZURE_OPENAI_DEPLOYMENT_NAME?: string
            AZURE_OPENAI_RESOURCE_NAME?: string;
            AZURE_OPENAI_API_KEY?: string;
            AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT?: string;
            AZURE_DOCUMENT_INTELLIGENCE_API_KEY?: string;
        }
    }

    interface DefaultPageProps {
        children: React.ReactNode;
    }
}

// Don't remove this line, it is required for TypeScript.
export { };