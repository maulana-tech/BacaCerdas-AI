"use client";

// import ApiClient from "@/lib/api";
import { useState } from "react";

export default function useGenerateAI() {
    const [generating, setGenerating] = useState(false);
    const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
    const [formData,] = useState<FormData>(new FormData());

    const onFileSelect = (file: File | null) => {

        if (!file) {
            setIsFileSelected(false);
            formData.delete("file");
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10 MB limit
            alert("File size exceeds the limit of 10MB");
            setIsFileSelected(false);
            return;
        }

        formData.append("file", file)

        setIsFileSelected(Boolean(file));
    }

    const onGenerate = async () => {
        try {
            if (!formData.has("file")) {
                throw new Error("No file selected for quiz generation.");
            }

            setGenerating(true);

            // const apiClient = new ApiClient();

            const ocr = await fetch("/api/ai/ocr", {
                method: "POST",
                body: formData
            });

            const ocrData = await ocr.json();

            if (!ocr.ok) {
                throw new Error(ocrData.message || "Failed to read file content.");
            }

            console.log("OCR Result:", ocrData);
        } catch (error) {
            console.error("Error generating quiz:", error);
        } finally {
            setGenerating(false);
        }
    }

    return {
        generating,
        isFileSelected,
        onFileSelect,
        onGenerate
    }
}