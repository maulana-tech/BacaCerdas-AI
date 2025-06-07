"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { HomeAppLayout } from "@/app/home/components/home-app-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Search, BookOpen, Award } from "lucide-react"
import ApiClient from "@/lib/api"
import type { Quiz } from "@/lib/types"

export default function QuizPageSiswa() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchQuizzes()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredQuizzes(quizzes)
    } else {
      const filtered = quizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredQuizzes(filtered)
    }
  }, [searchQuery, quizzes])

  const fetchQuizzes = async () => {
    setIsLoading(true)
    try {
      // Simulasi data karena API belum diimplementasikan
      // Dalam implementasi nyata, gunakan ApiClient untuk mengambil data
      // const apiClient = new ApiClient()
      // const response = await apiClient.instance.get('/quizzes')
      // const data = response.data
      
      // Data simulasi
      const mockQuizzes: Quiz[] = [
        {
          id: "1",
          title: "Quiz Bahasa Indonesia",
          content: [
            {
              question: "Apa yang dimaksud dengan paragraf?",
              options: [
                "Kumpulan kalimat yang saling berhubungan",
                "Kumpulan kata yang membentuk kalimat",
                "Bagian dari bab dalam buku",
                "Tanda baca dalam tulisan"
              ],
              correct_answer: 0,
              explanation: "Paragraf adalah kumpulan kalimat yang saling berhubungan dan membentuk satu kesatuan ide."
            }
          ],
          created_at: "2023-06-15T08:30:00Z",
          updated_at: "2023-06-15T08:30:00Z"
        },
        {
          id: "2",
          title: "Quiz Matematika Dasar",
          content: [
            {
              question: "Berapakah hasil dari 7 x 8?",
              options: ["54", "56", "58", "60"],
              correct_answer: 1,
              explanation: "7 x 8 = 56"
            }
          ],
          created_at: "2023-06-16T10:15:00Z",
          updated_at: "2023-06-16T10:15:00Z"
        },
        {
          id: "3",
          title: "Quiz Pengetahuan Umum",
          content: [
            {
              question: "Apa ibukota Indonesia?",
              options: ["Jakarta", "Bandung", "Surabaya", "Yogyakarta"],
              correct_answer: 0,
              explanation: "Jakarta adalah ibukota Indonesia."
            }
          ],
          created_at: "2023-06-17T14:45:00Z",
          updated_at: "2023-06-17T14:45:00Z"
        }
      ]
      
      setQuizzes(mockQuizzes)
      setFilteredQuizzes(mockQuizzes)
    } catch (error) {
      console.error("Error fetching quizzes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartQuiz = (quizId: string) => {
    router.push(`/home/quiz/siswa/attempt?id=${quizId}`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <HomeAppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Daftar Quiz</h1>
          <p className="text-gray-600 dark:text-gray-300">Pilih quiz yang ingin kamu kerjakan</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Cari quiz..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm text-gray-500">{formatDate(quiz.created_at)}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    <span>{quiz.content.length} Pertanyaan</span>
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button 
                  onClick={() => handleStartQuiz(quiz.id)}
                  className="w-full"
                >
                  Mulai Quiz
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <Search className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Tidak ada quiz ditemukan</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Tidak ada quiz yang sesuai dengan pencarian Anda. Coba kata kunci lain atau hapus filter pencarian.
          </p>
        </div>
      )}
    </HomeAppLayout>
  )
}