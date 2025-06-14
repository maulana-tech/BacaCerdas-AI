"use client"

import { motion } from "framer-motion"
import { Calendar, Edit, Trash2, FileText, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Quiz {
  id: string
  title: string
  description?: string
  content: Array<{
    question: string
    type: "multiple_choice" | "essay"
    options?: Array<{
      id: number
      text: string
      is_correct: boolean
    }>
    correct_answer?: number | string
    explanation?: string
    points?: number
  }>
  created_at: string
  updated_at: string
}

interface TeacherQuizCardProps {
  quiz: Quiz
  onDelete?: () => void
}

export function TeacherQuizCard({ quiz, onDelete }: TeacherQuizCardProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const getQuestionTypeStats = () => {
    if (!quiz?.content) return { multipleChoice: 0, essay: 0 };
    
    const stats = quiz.content.reduce(
      (acc, question) => {
        if (question?.type === "multiple_choice") {
          acc.multipleChoice++
        } else if (question?.type === "essay") {
          acc.essay++
        }
        return acc
      },
      { multipleChoice: 0, essay: 0 }
    )
    return stats
  }

  const stats = getQuestionTypeStats()
  const totalQuestions = quiz?.content?.length || 0

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/quiz/${quiz.id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete quiz")
      onDelete?.()
    } catch (error) {
      console.error("Error deleting quiz:", error)
    } finally {
      setIsDeleting(false)
      setIsConfirmOpen(false)
    }
  }

  return (
    <>
      <motion.div 
        whileHover={{ scale: 1.02, y: -5 }} 
        whileTap={{ scale: 0.98 }}
        className="h-full"
      >
        <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg line-clamp-1">{quiz.title}</CardTitle>
              <Badge variant="outline" className="rounded-xl">
                {totalQuestions} Questions
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {quiz.description || "No description provided"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(quiz.created_at)}
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {stats.essay} Essay
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {stats.multipleChoice} MCQ
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button asChild variant="outline" className="w-full">
              <Link href={`/home/quiz/guru/edit/${quiz.id}`}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Quiz
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setIsConfirmOpen(true)}
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4 mr-2 text-destructive" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the quiz "{quiz.title}" and all its questions. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Quiz"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
