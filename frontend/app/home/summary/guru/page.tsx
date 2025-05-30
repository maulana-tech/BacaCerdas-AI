"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TipTapEditor from "@/components/tiptap-editor"
import FileUpload from "@/components/ui/file-upload"

import { generateSummaryPDF } from "@/lib/pdf-utils"
import { Save, Download, Home, Eye } from "lucide-react"
import Link from "next/link"

export default function SummaryPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [summaryId, setSummaryId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const id = searchParams.get("id")
    if (id) {
      setSummaryId(id)
      loadSummary(id)
    }
  }, [searchParams])

  const loadSummary = async (id: string) => {
    console.log(
      `loadSummary dipanggil untuk ID: ${id}, tetapi pengambilan data dari Supabase telah dihapus.`,
    )
    alert(
      `Tidak dapat memuat rangkuman dengan ID: ${id}. Fitur interaksi database telah dinonaktifkan.`,
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

      if (!parseResponse.ok) throw new Error("Gagal mengurai dokumen")

      const { content: documentContent, filename } = await parseResponse.json()

      const summaryResponse = await fetch("/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: documentContent, title: filename }),
      })

      if (!summaryResponse.ok) throw new Error("Gagal menghasilkan rangkuman")

      const { summary } = await summaryResponse.json()

      setContent(summary)
      setTitle(`Rangkuman dari ${filename}`)
      setActiveTab("edit")
    } catch (error) {
      console.error("Error menghasilkan rangkuman:", error)
      alert("Gagal menghasilkan rangkuman dari dokumen")
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Judul rangkuman tidak boleh kosong")
      return
    }

    setSaving(true)
    try {
      // Logika Supabase dihapus
      console.log("Simulasi penyimpanan rangkuman (logika Supabase dihapus)...")
      console.log("Judul:", title.trim())
      console.log("Konten:", content)

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (summaryId) {
        console.log(`Rangkuman dengan ID '${summaryId}' 'diperbarui' (simulasi).`)
      } else {
        console.log("Rangkuman baru 'disimpan' (simulasi). Tidak ada ID database yang dibuat.")
      }

      alert("Rangkuman berhasil disimpan! (Simulasi - data tidak dikirim ke database)")
    } catch (error) {
      console.error("Error selama simulasi penyimpanan rangkuman:", error)
      alert("Gagal menyimpan rangkuman (operasi database dinonaktifkan).")
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = () => {
    if (!title.trim()) {
      alert("Judul rangkuman tidak boleh kosong")
      return
    }
    generateSummaryPDF(title, content)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{summaryId ? "Edit Rangkuman" : "Buat Rangkuman Baru"}</h1>
            <p className="text-gray-600">Buat rangkuman dari dokumen atau secara manual</p>
          </div>
          <Link href="/home">
            <Button variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Beranda
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Editor Rangkuman</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload Dokumen</TabsTrigger>
                    <TabsTrigger value="edit">Edit Manual</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Upload Dokumen untuk AI</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Upload file PDF atau Word untuk menghasilkan rangkuman secara otomatis
                      </p>
                      <FileUpload onFileSelect={handleFileUpload} />
                      {generating && (
                        <div className="mt-4 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">Menghasilkan rangkuman dengan AI...</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="edit" className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Judul Rangkuman
                      </label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Masukkan judul rangkuman..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Konten Rangkuman</label>
                      <TipTapEditor
                        content={content}
                        onChange={setContent}
                        placeholder="Mulai menulis rangkuman Anda di sini..."
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
                    <p className="text-gray-500 italic">Preview rangkuman akan muncul di sini saat Anda mengetik...</p>
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