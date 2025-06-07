import { docint_client } from "@/lib/ai";
import { type AnalyzeOperationOutput, getLongRunningPoller } from "@azure-rest/ai-document-intelligence";

type OCRApplicableContentType = | "application/octet-stream"
    | "application/pdf"
    | "image/jpeg"
    | "image/png"
    | "image/tiff"
    | "image/bmp"
    | "image/heif"
    | "text/html"
    | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    | "application/vnd.openxmlformats-officedocument.presentationml.presentation";

export const POST = async (request: Request) => {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
        return Response.json({
            message: "File is required",
        }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) { // 10 MB limit
        return Response.json({
            message: "File size exceeds the limit of 10MB",
        }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();

    const ocr = await docint_client
        .path("/documentModels/{modelId}:analyze", "prebuilt-read")
        .post({
            body: Buffer.from(arrayBuffer),
            contentType: file.type as OCRApplicableContentType,
        });

    const pooler = getLongRunningPoller(docint_client, ocr);
    const response = await pooler.pollUntilDone();

    if (response.status !== "200") {
        const body = response.body as AnalyzeOperationOutput;

        return Response.json({
            message: body.error?.message || "Failed to process the document",
        }, { status: parseInt(response.status) || 400 });
    }

    const result = response.body as AnalyzeOperationOutput;

    if (!result.analyzeResult || !result.analyzeResult.content) {
        return Response.json({
            message: "No content found in the document",
        }, { status: 400 });
    }


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const quizz = await fetch(`${baseUrl}/api/ai/quizz`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: result.analyzeResult.content,
        }),
    })

    return Response.json({
        message: "Not implemented yet",
    })

}