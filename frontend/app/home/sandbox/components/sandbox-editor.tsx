"use client";

import TipTapEditor from "@/components/tiptap-editor";

import { useSandbox } from "../lib/sandbox-context";
import { Card, CardContent } from "@/components/ui/card";

// Uncomment the following line if you want to use streaming events
export const runtime = "edge";

export default function SandboxEditor() {
    const { editor, content } = useSandbox();

    console.log("SandboxEditor content:", content);

    if (!editor) {
        return <div>Loading editor...</div>;
    }

    return (
        <Card className="w-full">
            <CardContent>
                <TipTapEditor editor={editor}
                />
            </CardContent>
        </Card>
    );
}