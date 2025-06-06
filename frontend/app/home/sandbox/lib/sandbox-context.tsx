"use client";

import type { Editor, UseEditorOptions } from "@tiptap/react";
import { createContext, useContext, useState } from "react";
import useTiptapEditor, { DEFAULT_EDITOR_OPTIONS } from "@/hooks/use-tiptap-editor";

interface SandboxContextProps {
    editor: Editor | null;
    content: string;
    setContent: (content: string) => void;
}

export const SandboxContext = createContext<SandboxContextProps>({
    editor: null,
    content: "",
    setContent: () => { },
});

export const useSandbox = () => useContext(SandboxContext);

interface SandboxProviderProps extends DefaultPageProps {
    options?: UseEditorOptions;
}

export const SandboxProvider = ({ children, options }: SandboxProviderProps) => {
    const [content, setContent] = useState<string>("");

    const editor = useTiptapEditor({
        options: {
            ...DEFAULT_EDITOR_OPTIONS,
            content,
            onUpdate: ({ editor }) => {
                setContent(editor.getHTML());
            },
            ...options
        }
    })

    return (
        <SandboxContext.Provider value={{ editor, content, setContent }}>
            {children}
        </SandboxContext.Provider>
    );
};