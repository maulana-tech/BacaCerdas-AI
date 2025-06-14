"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateQuizPDF } from "@/lib/pdf-utils" //
import type { QuizQuestion } from "@/lib/types" //
import { Save, Download, Home, Plus, Trash2, Eye, FileText, CheckSquare } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea" //
import { HomeAppLayout } from "@/app/home/components/home-app-layout" 
import UploadFileGenerateByAI from "./component/upload-file-generate-quizz-by-ai"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FileUpload from "@/components/ui/file-upload"

export default function QuizPageGuru() {
  const [title, setTitle] = useState("")
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [quizId, setQuizId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const searchParams = useSearchParams()

  useEffect(() => {
    const id = searchParams.get("id")
    if (id) {
      setQuizId(id)
      loadQuiz(id)
    }
  }, [searchParams])

  const loadQuiz = async (id: string) => {
    try {
      const response = await fetch(`/api/quiz/${id}`);
      if (!response.ok) throw new Error('Failed to load quiz');
      
      const quiz = await response.json();
      setTitle(quiz.title);
      setQuestions(quiz.content);
      setActiveTab('edit');
    } catch (error) {
      console.error('Error loading quiz:', error);
      alert('Gagal memuat kuis');
    }
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

      // Ensure generated questions have the correct format
      const formattedQuestions = generatedQuestions.map((q: any) => ({
        ...q,
        type: "multiple_choice",
        points: 1,
      }))

      setQuestions(formattedQuestions)
      setTitle(`Kuis dari ${filename}`)
      setActiveTab("edit")
    } catch (error) {
      console.error("Error generating quiz:", error)
      alert("Gagal menghasilkan kuis dari dokumen")
    } finally {
      setGenerating(false)
    }
  }

  const addQuestion = (type: "multiple_choice" | "essay") => {
    const newQuestion: QuizQuestion = {
      question: "",
      type: type,
      options: type === "multiple_choice" ? [
        { id: 0, text: "", is_correct: false },
        { id: 1, text: "", is_correct: false },
        { id: 2, text: "", is_correct: false },
        { id: 3, text: "", is_correct: false }
      ] : undefined,
      correct_answer: type === "multiple_choice" ? 0 : undefined,
      explanation: "",
      points: 1
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
    if (updatedQuestions[questionIndex].options) {
      updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options!.map((opt, idx) => 
        idx === optionIndex ? { ...opt, text: value } : opt
      )
    }
    setQuestions(updatedQuestions)
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Judul kuis tidak boleh kosong.")
      return
    }
    if (questions.length === 0) {
      alert("Kuis harus memiliki minimal 1 pertanyaan.")
      return
    }
    setSaving(true)
    try {
      const quizData = {
        title,
        courseId: "default", // You should get this from course context/props
        description: "", // Optional
        content: questions.map(q => ({
          question: q.question,
          type: q.type,
          options: q.type === 'multiple_choice' && q.options ? q.options.map((opt, idx) => ({
            id: idx,
            text: opt.text,
            is_correct: q.correct_answer === idx
          })) : undefined,
          correct_answer: q.type === 'multiple_choice' ? undefined : q.correct_answer,
          explanation: q.explanation || "",
          points: q.points || 1
        }))
      }

      const response = await fetch('/api/quiz', {
        method: quizId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      })

      if (!response.ok) {
        throw new Error('Gagal menyimpan kuis')
      }

      const savedQuiz = await response.json()
      if (!quizId) {
        setQuizId(savedQuiz.id)
      }
      alert('Kuis berhasil disimpan!')
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Terjadi kesalahan saat menyimpan kuis.");
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = () => {
    if (!title.trim()) {
      alert("Judul kuis tidak boleh kosong.")
      return
    }
    if (questions.length === 0) {
      alert("Kuis harus memiliki minimal 1 pertanyaan.")
      return
    }
    try {
      generateQuizPDF(title, questions.map(q => ({
        ...q,
        explanation: q.explanation || "",
        points: q.points || 1
      })))
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Terjadi kesalahan saat mengunduh PDF.");
    }
  }

  const getTotalPoints = () => {
    return questions.reduce((total, q) => total + (q.points || 1), 0)
  }

  return (
    <HomeAppLayout>
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
                        <div>
                          <h3 className="text-lg font-medium">Pertanyaan</h3>
                          {questions.length > 0 && (
                            <p className="text-sm text-gray-600">
                              Total: {questions.length} pertanyaan, {getTotalPoints()} poin
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => addQuestion("multiple_choice")} size="sm" variant="outline">
                            <CheckSquare className="h-4 w-4 mr-1" />
                            Pilihan Ganda
                          </Button>
                          <Button onClick={() => addQuestion("essay")} size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-1" />
                            Essay
                          </Button>
                        </div>
                      </div>

                      {questions.map((question, qIndex) => (
                        <Card key={qIndex} className="p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">Pertanyaan {qIndex + 1}</h4>
                                <Badge variant={question.type === "essay" ? "secondary" : "default"}>
                                  {question.type === "essay" ? "Essay" : "Pilihan Ganda"}
                                </Badge>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => removeQuestion(qIndex)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Tipe Pertanyaan:</label>
                                <Select
                                  value={question.type}
                                  onValueChange={(value: "multiple_choice" | "essay") =>
                                    updateQuestion(qIndex, "type", value)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="multiple_choice">Pilihan Ganda</SelectItem>
                                    <SelectItem value="essay">Essay</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Poin:</label>
                                <Input
                                  type="number"
                                  min="1"
                                  value={question.points || 1}
                                  onChange={(e) =>
                                    updateQuestion(qIndex, "points", Number.parseInt(e.target.value) || 1)
                                  }
                                />
                              </div>
                            </div>

                            <Textarea
                              value={question.question}
                              onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
                              placeholder="Masukkan pertanyaan..."
                              rows={2}
                            />

                            {question.type === "multiple_choice" && (
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Pilihan Jawaban:</label>
                                {question.options?.map((option, oIndex) => (
                                  <div key={oIndex} className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name={`correct-${qIndex}`}
                                      checked={question.correct_answer === oIndex}
                                      onChange={() => updateQuestion(qIndex, "correct_answer", oIndex)}
                                    />
                                    <Input
                                      value={option.text}
                                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                      placeholder={`Pilihan ${String.fromCharCode(65 + oIndex)}`}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            <Textarea
                              value={question.explanation || ""}
                              onChange={(e) => updateQuestion(qIndex, "explanation", e.target.value)}
                              placeholder={
                                question.type === "essay"
                                  ? "Panduan penilaian atau jawaban yang diharapkan..."
                                  : "Penjelasan jawaban (opsional)..."
                              }
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
                          <div className="flex items-center gap-2 mb-3">
                            <h3 className="font-medium">
                              {index + 1}. {question.question || "Pertanyaan belum diisi"}
                            </h3>
                            <Badge variant={question.type === "essay" ? "secondary" : "default"} className="text-xs">
                              {question.type === "essay" ? "Essay" : "PG"}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {question.points || 1} poin
                            </Badge>
                          </div>

                          {question.type === "multiple_choice" ? (
                            <div className="space-y-2">
                              {question.options?.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className={`p-2 rounded ${
                                    question.correct_answer === optIndex
                                      ? "bg-green-100 border border-green-300"
                                      : "bg-gray-50"
                                  }`}
                                >
                                  {String.fromCharCode(65 + optIndex)}. {option.text || "Pilihan belum diisi"}
                                  {question.correct_answer === optIndex && (
                                    <span className="ml-2 text-green-600 font-medium">✓</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="bg-blue-50 border border-blue-200 rounded p-3">
                              <p className="text-blue-800 text-sm">
                                <FileText className="h-4 w-4 inline mr-1" />
                                Pertanyaan Essay - Siswa akan menulis jawaban dalam bentuk teks
                              </p>
                            </div>
                          )}

                          {question.explanation && (
                            <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                              <strong>{question.type === "essay" ? "Panduan Penilaian:" : "Penjelasan:"}</strong>
                              <p className="mt-1">{question.explanation}</p>
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
    </HomeAppLayout>
  );
}