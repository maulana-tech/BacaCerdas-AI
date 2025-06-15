"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

import type { Quiz, QuizQuestion, QuizAnswer } from "@/lib/types"
import { ArrowLeft, Check as CheckCircle, X as XCircle, RotateCw as RotateCcw, Share2, Download as DownloadIcon, Pencil as Edit, FileText, Clock as TimeIcon } from "lucide-react"
import Link from "next/link"


import { studentQuizzes } from "@/lib/data/student-quizzes-data"

const USE_DUMMY_DATA = true;

export default function ReadQuizPage() {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
  const params = useParams()
  const router = useRouter()
  const quizId = params.id as string

  useEffect(() => {
    if (quizId) {
      loadQuiz(quizId)
    }
  }, [quizId])


  const loadQuiz = async (id: string) => {
    setLoading(true);
    try {
      let quizData: Quiz | null = null;

      if (USE_DUMMY_DATA) {
        // Mode Dummy: Cari kuis dari data lokal
        console.log(`Memuat kuis dummy dengan ID: ${id}`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulasi jeda jaringan
        const foundQuiz = studentQuizzes.find(q => q.id === id);
        if (foundQuiz) {
          quizData = foundQuiz;
        } else {
          throw new Error("Kuis dummy tidak ditemukan");
        }
      } else {
        // Mode API: Fetch dari internet (kode asli Anda)
        const response = await fetch(`/api/quiz/${id}`, {
          method: "GET",
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Kuis tidak ditemukan di API");
        }
        const result = await response.json();
        quizData = result.data;
      }

      // Proses data kuis yang ditemukan (baik dari dummy maupun API)
      if (quizData) {
        setQuiz(quizData);
        // Inisialisasi jawaban
        const initialAnswers: QuizAnswer[] = quizData.content.map((question: QuizQuestion, index: number) => ({
          questionIndex: index,
          type: question.type || "multiple_choice",
          answer: question.type === "essay" ? "" : -1,
        }));
        setAnswers(initialAnswers);
      } else {
        throw new Error("Data kuis tidak valid");
      }

    } catch (error) {
      console.error("Error loading quiz:", error);
      setError(error instanceof Error ? error.message : "Gagal memuat kuis");
    } finally {
      setLoading(false);
    }
  }


  const handleAnswerSelect = (answerValue: number | string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion].answer = answerValue
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quiz!.content.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setEndTime(new Date())
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    if (!quiz) return { score: 0, totalPoints: 0, mcScore: 0, essayCount: 0 }

    let correctPoints = 0
    let totalPoints = 0
    let essayCount = 0

    quiz.content.forEach((question: QuizQuestion, index: number) => {
      const points = question.points || 1
      totalPoints += points

      if (question.type === "multiple_choice") {
        // Gunakan 'options' untuk mencari jawaban yang benar
        const correctAnswerIndex = question.options?.findIndex(opt => opt.is_correct) ?? -1;
        if (answers[index].answer === correctAnswerIndex) {
          correctPoints += points
        }
      } else {
        essayCount++
      }
    })
    
    const mcTotalPoints = totalPoints - (quiz.content.filter(q => q.type === 'essay').reduce((sum, q) => sum + (q.points || 1), 0));
    const mcScore = mcTotalPoints > 0 ? Math.round((correctPoints / mcTotalPoints) * 100) : 0;

    return {
      score: mcScore,
      totalPoints,
      mcScore: correctPoints,
      essayCount,
    }
  }
  
  const resetQuiz = () => {
    setCurrentQuestion(0)
    const initialAnswers: QuizAnswer[] = quiz!.content.map((question: QuizQuestion, index: number) => ({
      questionIndex: index,
      type: question.type || "multiple_choice",
      answer: question.type === "essay" ? "" : -1,
    }))
    setAnswers(initialAnswers)
    setShowResults(false)
    setQuizStarted(false)
    setStartTime(null)
    setEndTime(null)
  }

  const startQuiz = () => {
    setQuizStarted(true)
    setStartTime(new Date())
  }

  const getTimeTaken = () => {
    if (!startTime || !endTime) return ""
    const diffMs = endTime.getTime() - startTime.getTime()
    const minutes = Math.floor(diffMs / 60000)
    const seconds = Math.floor((diffMs % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const isCurrentAnswerValid = () => {
    const currentAnswer = answers[currentQuestion]
    if (currentAnswer.type === "essay") {
      return typeof currentAnswer.answer === "string" && currentAnswer.answer.trim().length > 0
    } else {
      return currentAnswer.answer !== -1
    }
  }
  
  const handleShare = async () => {
    if (navigator.share && quiz) {
      try {
        await navigator.share({
          title: quiz.title,
          text: `Coba kuis: ${quiz.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link berhasil disalin ke clipboard!")
    }
  }

  const handleDownload = () => {
    if (!quiz) return
    let content = `${quiz.title}\n\n`
    quiz.content.forEach((question: QuizQuestion, index: number) => {
      content += `${index + 1}. ${question.question} (${question.points || 1} poin)\n`
      if (question.type === "multiple_choice") {
        question.options?.forEach((option, optIndex: number) => {
          const marker = option.is_correct ? "✓" : "○"
          content += `${marker} ${String.fromCharCode(65 + optIndex)}. ${option.text}\n`
        })
      } else {
        content += "[Pertanyaan Essay]\n"
      }
      if (question.explanation) {
        content += `${question.type === "essay" ? "Panduan Penilaian" : "Penjelasan"}: ${question.explanation}\n`
      }
      content += "\n"
    })

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${quiz.title}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const submitQuiz = async () => {
    if (!quiz || !startTime) return;
    
    setEndTime(new Date());
    
    try {
      const response = await fetch(`/api/quiz/${quiz.id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers,
          startTime: startTime.toISOString(),
          endTime: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan jawaban");
      }

      setShowResults(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Gagal menyimpan jawaban. Mohon coba lagi.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Memuat kuis...</p>
        </div>
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => router.back()}>Kembali</Button>
        </div>
      </div>
    )
  }
  
  if (!quizStarted) {
    const mcCount = quiz.content.filter((q) => q.type === "multiple_choice").length
    const essayCount = quiz.content.filter((q) => q.type === "essay").length
    const totalPoints = quiz.content.reduce((sum, q) => sum + (q.points || 1), 0)

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Button variant="ghost" onClick={() => router.back()} className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>

            <Card className="text-center">
              <CardHeader className="pb-4">
                <Badge variant="secondary" className="w-fit mx-auto mb-4">
                  Kuis
                </Badge>
                <CardTitle className="text-3xl mb-4">{quiz.title}</CardTitle>
                <div className="space-y-2 text-gray-600">
                  <p>
                    {quiz.content.length} pertanyaan total ({totalPoints} poin)
                  </p>
                  <div className="flex justify-center gap-4 text-sm">
                    {mcCount > 0 && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        {mcCount} Pilihan Ganda
                      </div>
                    )}
                    {essayCount > 0 && (
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {essayCount} Essay
                      </div>
                    )}
                  </div>
                  {quiz.content.length > 0 && <p>Estimasi waktu: {Math.ceil(quiz.content.length * 1.5)} menit</p>}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center gap-4">
                  <Button onClick={startQuiz} size="lg">
                    Mulai Kuis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    const { score, totalPoints, mcScore, essayCount } = calculateScore()
    const timeTaken = getTimeTaken()
    const mcTotalPoints = totalPoints - (quiz.content.filter(q => q.type === 'essay').reduce((sum, q) => sum + (q.points || 1), 0));

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center mb-8">
              <CardHeader>
                <CardTitle className="text-3xl mb-4">Hasil Kuis</CardTitle>
                <div className="space-y-4">
                  <div className="text-6xl font-bold text-green-600">{score}%</div>
                  <div className="space-y-2 text-gray-600">
                    <p className="text-xl">
                      Pilihan Ganda: {mcScore} dari {mcTotalPoints} poin
                    </p>
                    {essayCount > 0 && (
                      <p className="text-lg text-blue-600">{essayCount} jawaban essay perlu diperiksa manual</p>
                    )}
                    {timeTaken && (
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <TimeIcon className="h-4 w-4" />
                        Waktu: {timeTaken}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-4">
                  <Button onClick={resetQuiz}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Ulangi Kuis
                  </Button>
                  <Button variant="outline" onClick={() => router.back()}>
                    Kembali
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {quiz.content.map((question: QuizQuestion, index: number) => {
                const userAnswer = answers[index]
                const correctAnswerIndex = question.options?.findIndex(opt => opt.is_correct) ?? -1;
                const isCorrect = question.type === "multiple_choice" && userAnswer.answer === correctAnswerIndex;

                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        {question.type === "multiple_choice" ? (
                          isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )
                        ) : (
                          <FileText className="h-5 w-5 text-blue-600" />
                        )}
                        <CardTitle className="text-lg">
                          Pertanyaan {index + 1}: {question.question}
                        </CardTitle>
                        <Badge variant="outline">{question.points || 1} poin</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {question.type === "multiple_choice" ? (
                        <div className="space-y-2">
                          {question.options?.map((option, optIndex: number) => {
                            let className = "p-3 rounded border "
                            if (option.is_correct) {
                              className += "bg-green-100 border-green-300 text-green-800"
                            } else if (optIndex === userAnswer.answer && !isCorrect) {
                              className += "bg-red-100 border-red-300 text-red-800"
                            } else {
                              className += "bg-gray-50"
                            }

                            return (
                              <div key={optIndex} className={className}>
                                {String.fromCharCode(65 + optIndex)}. {option.text}
                                {option.is_correct && (
                                  <span className="ml-2 font-medium">✓ Jawaban Benar</span>
                                )}
                                {optIndex === userAnswer.answer && !option.is_correct && (
                                  <span className="ml-2 font-medium">✗ Jawaban Anda</span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="p-3 bg-blue-50 rounded border border-blue-200">
                            <strong className="text-blue-800">Jawaban Anda:</strong>
                            <p className="text-blue-700 mt-1 whitespace-pre-wrap">
                              {userAnswer.answer as string || "Tidak ada jawaban"}
                            </p>
                          </div>
                        </div>
                      )}
                      {question.explanation && (
                        <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                          <strong className="text-yellow-800">
                            {question.type === "essay" ? "Panduan Penilaian:" : "Penjelasan:"}
                          </strong>
                          <p className="text-yellow-700 mt-1">{question.explanation}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = quiz.content[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.content.length) * 100
  const currentAnswer = answers[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Keluar
              </Button>
              <div className="text-right">
                <span className="text-sm text-gray-600">
                  Pertanyaan {currentQuestion + 1} dari {quiz.content.length}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={currentQ.type === "essay" ? "secondary" : "default"}>
                    {currentQ.type === "essay" ? "Essay" : "Pilihan Ganda"}
                  </Badge>
                  <Badge variant="outline">{currentQ.points || 1} poin</Badge>
                </div>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {currentQuestion + 1}. {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentQ.type === "multiple_choice" ? (
                <div className="space-y-3">
                  {currentQ.options?.map((option, index) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border transition-colors ${
                        currentAnswer.answer === index
                          ? "bg-blue-100 border-blue-300 text-blue-800"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option.text}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Tulis jawaban Anda:</label>
                  <Textarea
                    value={currentAnswer.answer as string}
                    onChange={(e) => handleAnswerSelect(e.target.value)}
                    placeholder="Ketik jawaban essay Anda di sini..."
                    rows={6}
                    className="w-full"
                  />
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                  Sebelumnya
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isCurrentAnswerValid()}
                  className={currentQuestion === quiz.content.length - 1 ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {currentQuestion === quiz.content.length - 1 ? "Selesai" : "Selanjutnya"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}