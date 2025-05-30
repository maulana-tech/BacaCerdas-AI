"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { generateQuizPDF } from "@/lib/pdf-utils"
import type { QuizQuestion } from "@/lib/types"
import { Save, Download, Home, Plus, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import FileUpload from "@/components/ui/file-upload"
import { Textarea } from "@/components/ui/textarea"

export default function QuizPage() {
  const [title, setTitle] = useState("")
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [quizId, setQuizId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const id = searchParams.get("id")
    if (id) {
      setQuizId(id)
      // Memanggil loadQuiz, yang sekarang akan memberitahu bahwa pengambilan data dari Supabase dihapus
      loadQuiz(id)
    }
  }, [searchParams])

  const loadQuiz = async (id: string) => {
    // Logika Supabase telah dihapus.
    // Fungsi ini sekarang menjadi placeholder atau memerlukan implementasi baru
    // untuk penyimpanan non-Supabase (misalnya, localStorage).
    console.log(
      `loadQuiz dipanggil untuk ID: ${id}, tetapi pengambilan data dari Supabase telah dihapus.`,
    )
    alert(
      `Tidak dapat memuat kuis dengan ID: ${id}. Fitur interaksi database telah dinonaktifkan.`,
    )
    // Secara opsional, Anda dapat mengatur ulang judul dan pertanyaan di sini jika ID ada
    // tetapi tidak dapat dimuat, atau biarkan pengguna melihat data yang ada jika ada.
    // setTitle("Gagal Memuat Kuis");
    // setQuestions([]);
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

      const { content, filename } = await parseResponse.json()

      const quizResponse = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, title: filename }),
      })

      if (!quizResponse.ok) throw new Error("Failed to generate quiz")

      const { questions: generatedQuestions } = await quizResponse.json()

      setQuestions(generatedQuestions)
      setTitle(`Kuis dari ${filename}`)
      setActiveTab("edit")
    } catch (error) {
      console.error("Error generating quiz:", error)
      alert("Gagal menghasilkan kuis dari dokumen")
    } finally {
      setGenerating(false)
    }
  }

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      question: "",
      options: ["", "", "", ""],
      correct_answer: 0,
      explanation: "",
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setQuestions(updatedQuestions)
  }

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options[optionIndex] = value
    setQuestions(updatedQuestions)
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Judul kuis tidak boleh kosong")
      return
    }

    if (questions.length === 0) {
      alert("Kuis harus memiliki minimal 1 pertanyaan")
      return
    }

    setSaving(true)
    try {
      // Logika Supabase dihapus
      console.log("Simulasi penyimpanan (logika Supabase dihapus)...")
      console.log("Judul:", title.trim())
      console.log("Pertanyaan:", questions)

      await new Promise(resolve => setTimeout(resolve, 1000))

      if (quizId) {
        console.log(`Kuis dengan ID '${quizId}' 'diperbarui' (simulasi).`)
      } else {
        console.log("Kuis baru 'disimpan' (simulasi). Tidak ada ID database yang dibuat.")
      }

      alert("Kuis berhasil disimpan! (Simulasi - data tidak dikirim ke database)")
    } catch (error) {
      // Blok catch ini mungkin tidak lagi menangkap error dari operasi async database
      console.error("Error selama simulasi penyimpanan:", error)
      alert("Gagal menyimpan kuis (operasi database dinonaktifkan).")
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = () => {
    if (!title.trim()) {
      alert("Judul kuis tidak boleh kosong")
      return
    }
    generateQuizPDF(title, questions)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{quizId ? "Edit Kuis" : "Buat Kuis Baru"}</h1>
            <p className="text-gray-600">Buat kuis dari dokumen atau secara manual</p>
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
                <CardTitle>Editor Kuis</CardTitle>
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
                        Upload file PDF atau Word untuk menghasilkan kuis secara otomatis
                      </p>
                      <FileUpload onFileSelect={handleFileUpload} />
                      {generating && (
                        <div className="mt-4 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">Menghasilkan kuis dengan AI...</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="edit" className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Judul Kuis
                      </label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Masukkan judul kuis..."
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Pertanyaan</h3>
                        <Button onClick={addQuestion} size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Tambah
                        </Button>
                      </div>

                      {questions.map((question, qIndex) => (
                        <Card key={qIndex} className="p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">Pertanyaan {qIndex + 1}</h4>
                              <Button variant="ghost" size="sm" onClick={() => removeQuestion(qIndex)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <Textarea
                              value={question.question}
                              onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
                              placeholder="Masukkan pertanyaan..."
                              rows={2}
                            />

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Pilihan Jawaban:</label>
                              {question.options.map((option, oIndex) => (
                                <div key={oIndex} className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={`correct-${qIndex}`}
                                    checked={question.correct_answer === oIndex}
                                    onChange={() => updateQuestion(qIndex, "correct_answer", oIndex)}
                                  />
                                  <Input
                                    value={option}
                                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                    placeholder={`Pilihan ${String.fromCharCode(65 + oIndex)}`}
                                  />
                                </div>
                              ))}
                            </div>

                            <Textarea
                              value={question.explanation || ""}
                              onChange={(e) => updateQuestion(qIndex, "explanation", e.target.value)}
                              placeholder="Penjelasan jawaban (opsional)..."
                              rows={2}
                            />
                          </div>
                        </Card>
                      ))}
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
                  Preview Kuis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {title && <h2 className="text-xl font-bold text-gray-900">{title}</h2>}

                  {questions.length > 0 ? (
                    <div className="space-y-6">
                      {questions.map((question, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h3 className="font-medium mb-3">
                            {index + 1}. {question.question || "Pertanyaan belum diisi"}
                          </h3>
                          <div className="space-y-2">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-2 rounded ${
                                  question.correct_answer === optIndex
                                    ? "bg-green-100 border border-green-300"
                                    : "bg-gray-50"
                                }`}
                              >
                                {String.fromCharCode(65 + optIndex)}. {option || "Pilihan belum diisi"}
                                {question.correct_answer === optIndex && (
                                  <span className="ml-2 text-green-600 font-medium">✓</span>
                                )}
                              </div>
                            ))}
                          </div>
                          {question.explanation && (
                            <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                              <strong>Penjelasan:</strong> {question.explanation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Preview kuis akan muncul di sini...</p>
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