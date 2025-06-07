import { createAzure } from "@ai-sdk/azure";
import DocumentIntelligece from "@azure-rest/ai-document-intelligence";

export const azure = createAzure({
    resourceName: process.env.AZURE_OPENAI_RESOURCE_NAME,
    baseURL: process.env.AZURE_OPENAI_BASE_URL,
    apiKey: process.env.AZURE_OPENAI_API_KEY
});

export const docint_client = DocumentIntelligece(
    process.env.AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT || "",
    {
        key: process.env.AZURE_DOCUMENT_INTELLIGENCE_API_KEY || "",
    }
)

export const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-4o-mini";

export const model = azure(deploymentName);