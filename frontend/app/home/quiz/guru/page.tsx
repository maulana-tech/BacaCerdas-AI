"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateQuizPDF } from "@/lib/pdf-utils" //
import type { QuizQuestion } from "@/lib/types" //
import { Save, Download, Home, Plus, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea" //
import { HomeAppLayout } from "@/app/home/components/home-app-layout" 
import UploadFileGenerateByAI from "./component/upload-file-generate-quizz-by-ai"

export default function QuizPageGuru() {
  const [title, setTitle] = useState("")
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [saving, setSaving] = useState(false)
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
    console.log(
      `loadQuiz called for ID: ${id}, but database fetching is disabled.`
    )
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
      alert("Quiz title cannot be empty.")
      return
    }
    if (questions.length === 0) {
      alert("Quiz must have at least 1 question.")
      return
    }
    setSaving(true)
    try {
      console.log("Simulating quiz save (database logic removed)...");
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error during simulated save:", error);
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = () => {
    if (!title.trim()) {
      alert("Quiz title cannot be empty.")
      return
    }
    generateQuizPDF(title, questions)
  }

  return (
    <HomeAppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{quizId ? "Edit Quiz" : "Create New Quiz"}</h1>
          <p className="text-gray-600 dark:text-gray-300">Create quizzes from documents or manually.</p>
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
              <CardTitle>Quiz Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload Document</TabsTrigger>
                  <TabsTrigger value="edit">Manual Edit</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="space-y-4 mt-4">
                  <UploadFileGenerateByAI />
                </TabsContent>

                <TabsContent value="edit" className="space-y-4 mt-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Quiz Title
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter quiz title..."
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Questions</h3>
                      <Button onClick={addQuestion} size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>

                    {questions.map((question, qIndex) => (
                      <Card key={qIndex} className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">Question {qIndex + 1}</h4>
                            <Button variant="ghost" size="sm" onClick={() => removeQuestion(qIndex)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <Textarea
                            value={question.question}
                            onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
                            placeholder="Enter question..."
                            rows={2}
                          /> {/* */}

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Answer Choices:</label>
                            {question.options.map((option, oIndex) => (
                              <div key={oIndex} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`correct-${qIndex}`}
                                  checked={question.correct_answer === oIndex}
                                  onChange={() => updateQuestion(qIndex, "correct_answer", oIndex)}
                                  className="form-radio h-4 w-4 text-blue-600"
                                />
                                <Input
                                  value={option}
                                  onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                  placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                                />
                              </div>
                            ))}
                          </div>

                          <Textarea
                            value={question.explanation || ""}
                            onChange={(e) => updateQuestion(qIndex, "explanation", e.target.value)}
                            placeholder="Explanation (optional)..."
                            rows={2}
                          /> {/* */}
                        </div>
                      </Card>
                    ))}
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
                Quiz Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {title && <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>}

                {questions.length > 0 ? (
                  <div className="space-y-6">
                    {questions.map((question, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-medium mb-3">
                          {index + 1}. {question.question || "Question not filled"}
                        </h3>
                        <div className="space-y-2">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-2 rounded ${
                                question.correct_answer === optIndex
                                  ? "bg-green-100 border border-green-300 dark:bg-green-800 dark:border-green-600"
                                  : "bg-gray-50 dark:bg-slate-700"
                              }`}
                            >
                              {String.fromCharCode(65 + optIndex)}. {option || "Option not filled"}
                              {question.correct_answer === optIndex && (
                                <span className="ml-2 text-green-600 dark:text-green-300 font-medium">✓</span>
                              )}
                            </div>
                          ))}
                        </div>
                        {question.explanation && (
                          <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900 rounded text-sm">
                            <strong>Explanation:</strong> {question.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">Quiz preview will appear here...</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </HomeAppLayout>
  );
}