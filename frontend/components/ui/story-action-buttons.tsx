"use client"

import { Save, Download, Sparkles } from "lucide-react";
import { Button } from "./button";
import { CardFooter } from "./card";

interface StoryActionButtonsProps {
  onSave?: () => Promise<void>;
  onDownload?: () => Promise<void>;
  onAIAssist?: () => void;
  isLoadingSave?: boolean;
  saveDisabled?: boolean;
  showAIAssist?: boolean;
}

export function StoryActionButtons({
  onSave,
  onDownload,
  onAIAssist,
  isLoadingSave,
  saveDisabled,
  showAIAssist
}: StoryActionButtonsProps) {
  if (!onSave && !onDownload) return null;

  return (
    <CardFooter className="justify-end space-x-2 border-t border-slate-700 pt-4">
      {onSave && (
        <Button
          onClick={onSave}
          variant="default"
          size="sm"
          disabled={saveDisabled || isLoadingSave}
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoadingSave ? "Saving..." : "Save"}
        </Button>
      )}
      
      {onDownload && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={onDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      )}

      {showAIAssist && onAIAssist && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={onAIAssist}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          AI
        </Button>
      )}
    </CardFooter>
  );
}
