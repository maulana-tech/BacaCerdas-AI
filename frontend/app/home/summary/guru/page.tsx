"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button" //
import { Input } from "@/components/ui/input" //
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" //
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" //
import TipTapEditor from "@/components/tiptap-editor" //
import FileUpload from "@/components/ui/file-upload" //
import { generateSummaryPDF } from "@/lib/pdf-utils" //
import { Save, Download, Home, Eye } from "lucide-react"
import Link from "next/link"
import { HomeAppLayout } from "@/app/home/components/home-app-layout"
import useTiptapEditor from "@/hooks/use-tiptap-editor"

export default function SummaryPageGuru() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [summaryId, setSummaryId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const searchParams = useSearchParams()
  const router = useRouter()

  const editor = useTiptapEditor({
    options: {
      content,
      onUpdate: ({ editor }) => {
        setContent(editor.getHTML())
      }
    }
  });

  useEffect(() => {
    const id = searchParams.get("id")
    if (id) {
      setSummaryId(id)
      loadSummary(id)
    }
  }, [searchParams])

  const loadSummary = async (id: string) => {
    console.log(
      `loadSummary called for ID: ${id}, but database fetching is disabled.`
    )
  }

  const handleFileUpload = async (file: File) => {
    setGenerating(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const parseResponse = await fetch("/api/parse-document", {
        method: "POST",
        body: formData,
      })

      if (!parseResponse.ok) throw new Error("Failed to parse document")

      const { content: documentContent, filename } = await parseResponse.json()

      const summaryResponse = await fetch("/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: documentContent, title: filename }),
      })

      if (!summaryResponse.ok) throw new Error("Failed to generate summary")

      const { summary } = await summaryResponse.json()

      setContent(summary)
      setTitle(`Summary of ${filename}`)
      setActiveTab("edit")
    } catch (error) {
      console.error("Error generating summary:", error)
      alert("Failed to generate summary from document.")
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Summary title cannot be empty.")
      return
    }
    setSaving(true)
    try {
      console.log("Simulating summary save (database logic removed)...");
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error during simulated save:", error);
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = () => {
    if (!title.trim()) {
      alert("Summary title cannot be empty.")
      return
    }
    generateSummaryPDF(title, content) //
  }

  return (
    <HomeAppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{summaryId ? "Edit Summary" : "Create New Summary"}</h1>
          <p className="text-gray-600 dark:text-gray-300">Create summaries from documents or manually.</p>
        </div>
        <Link href="/home">
          <Button variant="default">
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Summary Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload Document</TabsTrigger>
                  <TabsTrigger value="edit">Manual Edit</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="space-y-4 mt-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Upload Document for AI</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Upload PDF or Word files to generate summaries automatically.
                    </p>
                    <FileUpload onFileSelect={handleFileUpload} /> {/* */}
                    {generating && (
                      <div className="mt-4 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Generating summary with AI...</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="edit" className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Summary Title
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter summary title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Summary Content</label>
                    <TipTapEditor
                      editor={editor}
                    /> {/* */}
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
                  <p className="text-gray-500 dark:text-gray-400 italic">Summary preview will appear here as you type...</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </HomeAppLayout>
  );
}