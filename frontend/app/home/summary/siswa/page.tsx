"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { getStudentSummaries, getSummaryById, saveSummaryAction } from "./action"

import useTiptapEditor from "@/hooks/use-tiptap-editor"

import { HomeAppLayout } from "@/app/home/components/home-app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TipTapEditor from "@/components/tiptap-editor"
import FileUpload from "@/components/ui/file-upload"
import { Skeleton } from "@/components/ui/skeleton"
import type { Summary } from "@/lib/types"

// Icons
import { BookOpen, Edit, Eye, PlusCircle, Save, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

const [content, setContent] = useState("")
const [generating, setGenerating] = useState(false)


type ViewMode = "list" | "editor"

const editor = useTiptapEditor({
  options: {
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    }
  }
});

const SummaryListView = ({
  summaries,
  onEdit,
  onCreate,
  loading,
}: {
  summaries: Summary[]
  onEdit: (id: string) => void
  onCreate: () => void
  loading: boolean
}) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("id-ID", options)
  }

  const createSnippet = (content: string, maxLength: number = 120) => {
    const textContent = content.replace(/<[^>]*>/g, "")
    return textContent.length > maxLength ? textContent.slice(0, maxLength) + "..." : textContent
  }

  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Daftar Rangkuman Saya</h2>
        <Button onClick={onCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Buat Rangkuman Baru
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}><CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader><CardContent><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3 mt-2" /></CardContent><CardFooter><Skeleton className="h-10 w-full" /></CardFooter></Card>
          ))}
        </div>
      ) : summaries.length === 0 ? (
        <div className="text-center py-10"><p>Anda belum membuat rangkuman. Klik "Buat Rangkuman Baru" untuk memulai.</p></div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {summaries.map(summary => (
            <Card key={summary.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="leading-tight">{summary.title}</CardTitle>
                <CardDescription>Dibuat pada {formatDate(summary.createdAt)}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow"><p className="text-sm text-gray-600">{createSnippet(summary.content)}</p></CardContent>
              <CardFooter className="flex gap-2">
                <Link href={`/home/summary/siswa/${summary.id}`} passHref legacyBehavior><a className="w-full"><Button variant="outline" className="w-full"><BookOpen className="mr-2 h-4 w-4" />Baca</Button></a></Link>
                <Button className="w-full" onClick={() => onEdit(summary.id)}><Edit className="mr-2 h-4 w-4" />Edit</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// --- Komponen untuk Tampilan Editor ---
const SummaryEditorView = ({
  summaryId,
  onBack,
  onSaveSuccess,
}: {
  summaryId: string | null
  onBack: () => void
  onSaveSuccess: () => void
}) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("edit")

  const { data: session } = useSession()

  const editor = useTiptapEditor({
    options: {
      content,
      onUpdate: ({ editor }) => setContent(editor.getHTML()),
    },
  })

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

  useEffect(() => {
    if (summaryId) {
      const loadSummary = async () => {
        const summary = await getSummaryById(summaryId)
        if (summary) {
          setTitle(summary.title)
          setContent(summary.content)
        }
      }
      loadSummary()
    } else {
        // Reset state untuk entri baru
        setTitle("")
        setContent("")
    }
  }, [summaryId])

  useEffect(() => {
    if (editor && !editor.isDestroyed && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Judul tidak boleh kosong.")
      return
    }
    if (!session?.user?.id) {
      toast.error("Sesi tidak ditemukan.")
      return
    }

    setSaving(true)
    try {
      await saveSummaryAction({ title, content }, session.user.id, summaryId)
      toast.success("Rangkuman berhasil disimpan.")
      onSaveSuccess()
    } catch (error: any) {
      toast.error(error.message || "Gagal menyimpan rangkuman.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{summaryId ? "Edit Rangkuman" : "Buat Rangkuman Baru"}</h1>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Daftar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader><CardTitle>Editor</CardTitle></CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Unggah (AI)</TabsTrigger>
                  <TabsTrigger value="edit">Manual</TabsTrigger>
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
                    <label htmlFor="title" className="block text-sm font-medium mb-2">Judul</label>
                    <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Masukkan judul..."/>
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
                  <Button onClick={handleSave} disabled={saving}><Save className="h-4 w-4 mr-2" />{saving ? "Menyimpan..." : "Simpan"}</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader><CardTitle className="flex items-center"><Eye className="h-5 w-5 mr-2" />Pratinjau</CardTitle></CardHeader>
            <CardContent><div className="border rounded-lg p-4 min-h-[500px] bg-white"><h1 className="text-2xl font-bold mb-4">{title}</h1><div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content }}/></div></CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


// --- Komponen Utama Halaman ---
export default function SiswaSummaryPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [summaries, setSummaries] = useState<Summary[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSummaryId, setCurrentSummaryId] = useState<string | null>(null)

  const fetchSummaries = async () => {
    setLoading(true)
    const data = await getStudentSummaries()
    setSummaries(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchSummaries()
  }, [])

  const handleCreate = () => {
    setCurrentSummaryId(null)
    setViewMode("editor")
  }

  const handleEdit = (id: string) => {
    setCurrentSummaryId(id)
    setViewMode("editor")
  }

  const handleBack = () => {
    setViewMode("list")
    setCurrentSummaryId(null)
  }

  const handleSaveSuccess = () => {
    fetchSummaries() // Ambil ulang daftar setelah menyimpan
    setViewMode("list")
    setCurrentSummaryId(null)
  }

  return (
    <HomeAppLayout>
      <ScrollArea className="h-full p-4 md:p-8 pt-6">
        {viewMode === "list" ? (
          <SummaryListView
            summaries={summaries}
            onEdit={handleEdit}
            onCreate={handleCreate}
            loading={loading}
          />
        ) : (
          <SummaryEditorView
            summaryId={currentSummaryId}
            onBack={handleBack}
            onSaveSuccess={handleSaveSuccess}
          />
        )}
      </ScrollArea>
    </HomeAppLayout>
  )
}