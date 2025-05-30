"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TipTapEditor from "@/components/tiptap-editor"
import StoryAIAssistant from "@/components/story-ai-assistant"
import { generateStoryPDF } from "@/lib/pdf-utils"
import { Save, Download, Home, Eye, Sparkles, Edit } from "lucide-react"
import Link from "next/link"

export default function StoryPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false) 
  const [storyId, setStoryId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("ai-assistant")
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const id = searchParams.get("id")
    if (id) {
      setStoryId(id)
      setActiveTab("editor") 
      loadStory(id)
    }
  }, [searchParams])

  const loadStory = async (id: string) => {

    console.log(
      `loadStory dipanggil untuk ID: ${id}, tetapi pengambilan data dari Supabase telah dihapus.`,
    )
    alert(
      `Tidak dapat memuat cerita dengan ID: ${id}. Fitur interaksi database telah dinonaktifkan.`,
    )
  }

  const handleUseAIStory = (aiContent: string, aiTitle?: string) => {
    if (aiTitle && !title.trim()) {
      setTitle(aiTitle)
    }
    setContent(aiContent)
    setActiveTab("editor")
  }

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Judul cerita tidak boleh kosong")
      return
    }

    setSaving(true)
    try {
      console.log("Simulasi penyimpanan cerita (logika Supabase dihapus)...")
      console.log("Judul:", title.trim())
      console.log("Konten:", content)
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (storyId) {
        console.log(`Cerita dengan ID '${storyId}' 'diperbarui' (simulasi).`)
      } else {
        console.log("Cerita baru 'disimpan' (simulasi). Tidak ada ID database yang dibuat.")
      }

      alert("Cerita berhasil disimpan! (Simulasi - data tidak dikirim ke database)")
    } catch (error) {
      console.error("Error selama simulasi penyimpanan cerita:", error)
      alert("Gagal menyimpan cerita (operasi database dinonaktifkan).")
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = () => {
    if (!title.trim()) {
      alert("Judul cerita tidak boleh kosong")
      return
    }
    generateStoryPDF(title, content)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat cerita...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{storyId ? "Edit Cerita" : "Buat Cerita Baru"}</h1>
            <p className="text-gray-600">
              {storyId ? "Edit cerita Anda" : "Mulai dengan AI Assistant atau langsung ke editor"}
            </p>
          </div>
          <Link href="/home">
            <Button variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Beranda
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
                    <StoryAIAssistant onUseStory={handleUseAIStory} />
                  </TabsContent>

                  <TabsContent value="editor" className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Judul Cerita
                      </label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Masukkan judul cerita..."
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Konten Cerita</label>
                      <TipTapEditor
                        content={content}
                        onChange={setContent}
                        placeholder="Mulai menulis cerita Anda di sini..."
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSave} disabled={saving}>
                        <Save className="h-4 w-4 mr-2" />
                        {saving ? "Menyimpan..." : "Simpan"}
                      </Button>
                      <Button variant="outline" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      {!storyId && ( // Tombol AI Assistant hanya muncul jika membuat cerita baru
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
                  Preview Real-time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 min-h-[400px] bg-white">
                  {title && <h1 className="text-2xl font-bold mb-4 text-gray-900">{title}</h1>}
                  {content ? (
                    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
                  ) : (
                    <div className="text-center py-12">
                      <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 italic">
                        {activeTab === "ai-assistant"
                          ? "Gunakan AI Assistant untuk menghasilkan ide cerita..."
                          : "Preview cerita akan muncul di sini saat Anda mengetik..."}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}