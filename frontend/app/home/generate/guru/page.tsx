"use client"

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TipTapEditor from "@/components/tiptap-editor";
import StoryAIAssistant from "@/components/story-ai-assistant";
import { generateStoryPDF, generateStoryPDFFromEditor } from "@/lib/pdf-utils"; 
import { Save, Download, Home, Eye, Sparkles, Edit } from "lucide-react";
import Link from "next/link";
import { HomeAppLayout } from "@/app/home/components/home-app-layout"; 
import useTiptapEditor from "@/hooks/use-tiptap-editor";

import TurndownService from "turndown";

export default function StoryPageGuru() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storyId, setStoryId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("ai-assistant");
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Hapus konfigurasi TurndownService
  // const turndownService = new TurndownService({...});
  
  const editor = useTiptapEditor({
    options: {
      content,
      onUpdate: ({ editor }) => {
        setContent(editor.getHTML());
      },
    }
  });

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setStoryId(id);
      setActiveTab("editor");
      loadStory(id);
    }
  }, [searchParams]);

  const loadStory = async (id: string) => {
    console.log(
      `loadStory called for ID: ${id}, but database fetching is disabled.`
    );
  };

  const handleUseAIStory = (aiContent: string, aiTitle?: string) => {
    if (aiTitle && !title.trim()) {
      setTitle(aiTitle);
    }

    const cleanedContent = aiContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/style=\"[^\"]*\"/gi, '');

    // Simpan langsung HTML ke content (bukan markdown)
    setContent(cleanedContent);
    setActiveTab("editor");

    if (editor) {
      editor.commands.setContent(cleanedContent, false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Story title cannot be empty.");
      return;
    }
    setSaving(true);
    try {
      console.log("Simulating story save (Supabase logic removed)...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      // alert("Story saved successfully! (Simulation)");
    } catch (error) {
      console.error("Error during simulated save:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    if (!title.trim()) {
      alert("Story title cannot be empty.");
      return;
    }

    try {
      // Set loading state
      setLoading(true);

      const htmlContent = editor ? editor.getHTML() : content;
      if (!htmlContent) {
        throw new Error("Konten cerita kosong");
      }

      await generateStoryPDF(title, htmlContent);
    } catch (error) {
      console.error("Error in handleDownload:", error);
      alert(error instanceof Error ? error.message : "Gagal memproses konten. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <HomeAppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading story...</p>
          </div>
        </div>
      </HomeAppLayout>
    );
  }

  return (
    <HomeAppLayout> {/* Wrap the page content with HomeAppLayout */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{storyId ? "Edit Story" : "Create New Story"}</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {storyId ? "Edit your story" : "Start with AI Assistant or go straight to the editor"}
          </p>
        </div>
        <Link href="/home">
          <Button variant="default">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Content */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Story Creator</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="ai-assistant" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    AI Assistant
                  </TabsTrigger>
                  <TabsTrigger value="editor" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Editor
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="ai-assistant" className="mt-4">
                  <StoryAIAssistant onUseStory={handleUseAIStory} /> {/* */}
                </TabsContent>

                <TabsContent value="editor" className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Story Title
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter story title..."
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Story Content</label>
                    {
                      editor ? (
                        <TipTapEditor
                          editor={editor}
                        />
                      ) : (
                        <div className="border rounded-lg p-4 min-h-[400px] bg-gray-100 dark:bg-slate-800">
                          <p className="text-gray-500 dark:text-gray-400 italic">Loading editor...</p>
                        </div>
                      )
                    }
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={saving}>
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? "Saving..." : "Save"}
                    </Button>
                    <Button variant="outline" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    {!storyId && (
                      <Button variant="outline" onClick={() => setActiveTab("ai-assistant")}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        AI Assistant
                      </Button>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Real-time Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 min-h-[400px] bg-white dark:bg-slate-800">
                {title && <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h1>}
                {content ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  <div className="text-center py-12">
                    <Sparkles className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      {activeTab === "ai-assistant"
                        ? "Use the AI Assistant to generate story ideas..."
                        : "Story preview will appear here as you type..."}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </HomeAppLayout>
  );
}

// Di bagian atas file, setelah deklarasi turndownService
const turndownService = new TurndownService({
  headingStyle: 'atx',      // Gunakan # untuk heading
  codeBlockStyle: 'fenced', // Gunakan ``` untuk blok kode
  emDelimiter: '_'          // Gunakan _ untuk italic
});

// Hapus tag body dan atribut CSS yang tidak diinginkan
turndownService.addRule('removeBodyTag', {
  filter: ['body'],
  replacement: function(content) {
    return content;
  }
});