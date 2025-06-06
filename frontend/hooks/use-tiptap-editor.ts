"use client";

import type { DependencyList } from "react";
import { useEditor, type UseEditorOptions } from "@tiptap/react"

import StarterKit from "@tiptap/starter-kit"


export const DEFAULT_EDITOR_OPTIONS: UseEditorOptions = {
  extensions: [StarterKit],
  immediatelyRender: false,
  editorProps: {
    attributes: {
      class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 border-0",
    },
  },
};

export default function useTiptapEditor({ options, deps }: { options?: UseEditorOptions, deps?: DependencyList }) {
  return useEditor({
    ...DEFAULT_EDITOR_OPTIONS,
    ...options,
  }, deps)
}