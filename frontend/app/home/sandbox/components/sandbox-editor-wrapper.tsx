"use client";

import SandboxEditor from "./sandbox-editor";
import SandboxLivePreview from "./sandbox-live-preview";

import { SandboxProvider } from "../lib/sandbox-context";

export default function SandboxEditorWrapper() {
    return (
        <SandboxProvider>
            <div className="flex w-full gap-x-12">
                <SandboxEditor />
                <SandboxLivePreview />
            </div>
        </SandboxProvider>
    )
}