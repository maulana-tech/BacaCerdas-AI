"use client";

import useDebounce from "@/hooks/use-debounces";
import { useSandbox } from "../lib/sandbox-context";
import { isEmptyHtml } from "@/lib/is";

export default function SandboxLivePreview() {
    const { content } = useSandbox();
    const debouncedContent = useDebounce(content, 500);

    return (
        <div className="flex flex-col items-center w-full h-100">
            <h1 className="text-2xl text-foreground font-bold mb-4">Sandbox Editor Live Preview</h1>
            <p className="text-muted-foreground">This is a live preview for the sandbox editor.</p>
            <div className="w-full max-w-2xl mt-4">
                {/* Placeholder for the live preview component */}
                {
                    content && content.trim() && !isEmptyHtml(content) ? (
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md min-h-76" dangerouslySetInnerHTML={{ __html: debouncedContent }} />
                    ) : (
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md min-h-76">
                            <p className="text-gray-700">Live preview content will appear here...</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}