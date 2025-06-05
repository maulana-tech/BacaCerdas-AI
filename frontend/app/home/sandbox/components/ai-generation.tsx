"use client";

import { useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import useTiptapEditor, { DEFAULT_EDITOR_OPTIONS } from "@/hooks/use-tiptap-editor";
import Placeholder from "@tiptap/extension-placeholder";

import TipTapEditor from "@/components/tiptap-editor";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AiGeneration() {
    const [content, setContent] = useState<string | null>(null);
    const { completion, setInput, handleSubmit, isLoading } = useCompletion({
        api: "/api/ai/story"

    })

    const editor = useTiptapEditor({
        options: {
            extensions: [
                Placeholder.configure({
                    placeholder: `Judul: Tuliskan judul cerita Anda di sini.
Deskripsi: Berikan deskripsi singkat tentang cerita Anda di sini.
Isi: Mulailah menulis cerita Anda di sini. Gunakan format yang sesuai untuk membuat cerita yang menarik.
Anda dapat menggunakan heading, paragraf, dan daftar untuk mengatur struktur cerita Anda.`
                }),
                ...DEFAULT_EDITOR_OPTIONS.extensions || []
            ],
            content,
            onUpdate: ({ editor }) => {
                setInput(editor.getText());
                setContent(editor.getHTML());
            },
        }
    })

    return (
        <Card className="w-full mt-8">
            <CardContent>
                <div className="flex w-full gap-x-4">
                    <div className="flex-1/2 h-full relative">
                        {
                            editor ? (
                                <TipTapEditor editor={editor} />
                            ) : (
                                <div className="border rounded-lg p-4">
                                    <p className="text-gray-500">Loading editor...</p>
                                </div>
                            )
                        }
                        <Button className="absolute max-w-fit bottom-3 right-2" onClick={handleSubmit} disabled={!editor || !content || isLoading}>
                            <Sparkle />
                            Generate with AI
                        </Button>
                    </div>
                    {/* Placeholder for AI generation component */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md min-h-76 flex-1/2">
                        {
                            content ? (
                                <div className="text-background" dangerouslySetInnerHTML={{ __html: completion }} />
                            ) : (
                                <p className="text-gray-700">AI generation content will appear here...</p>
                            )
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}