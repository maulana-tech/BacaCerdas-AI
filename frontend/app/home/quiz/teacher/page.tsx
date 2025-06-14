"use client"

import { useState, useEffect } from "react"
import { HomeAppLayout } from "@/app/home/components/home-app-layout"
import { TeacherQuizCard } from "@/app/home/components/cards/teacher-quiz-card"
import type { Quiz } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function TeacherQuizzesPage() {
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
      const response = await fetch("/api/quiz")
      if (!response.ok) throw new Error("Failed to fetch quizzes")
      const data = await response.json()
      setQuizzes(data.data)
      setFilteredQuizzes(data.data)
    } catch (error) {
      console.error("Error fetching quizzes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <HomeAppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quiz Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Create and manage your quizzes</p>
        </div>
        <Link href="/home/quiz/guru">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Quiz
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search quizzes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[200px] animate-pulse bg-gray-200 dark:bg-gray-800 rounded-3xl" />
          ))}
        </div>
      ) : filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <TeacherQuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <Search className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No quizzes found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {searchQuery ? (
              "No quizzes match your search. Try different keywords or clear the search."
            ) : (
              "You haven't created any quizzes yet. Click the 'Create Quiz' button to get started."
            )}
          </p>
        </div>
      )}
    </HomeAppLayout>
  )
}
