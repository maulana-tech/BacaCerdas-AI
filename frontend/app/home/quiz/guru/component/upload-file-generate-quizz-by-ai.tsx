import FileUpload from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";

import useGenerateAI from "../hooks/use-generate-ai";
import { Sparkle } from "lucide-react";

function GeneratingIndicator() {
  return (
    <div className="mt-4 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
      <p className="text-sm text-gray-600 dark:text-gray-400">Generating quiz with AI...</p>
    </div>
  );
}

export default function UploadFileGenerateByAI() {
  const { generating, isFileSelected, onFileSelect, onGenerate } = useGenerateAI();

  return (
    <>
      <h3 className="text-lg font-medium mb-2">Upload Document for AI</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Upload PDF or Word files to generate quizzes automatically.
      </p>

      <FileUpload onFileSelect={onFileSelect} />

      <div className="text-right">
        <Button disabled={!isFileSelected || generating} className="mt-4" onClick={onGenerate}>
          <Sparkle />
          {generating ? "Generating..." : "Generate Quiz with AI"}
        </Button>
      </div>

      {
        generating && <GeneratingIndicator />
      }

    </>
  );
}