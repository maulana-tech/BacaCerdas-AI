"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Trophy, MoreHorizontal, Plus, Folder } from "lucide-react"

const initialProgress = [
  { subject: "Matematika", progress: 75, totalLessons: 20, completedLessons: 15 },
  { subject: "Bahasa Indonesia", progress: 90, totalLessons: 18, completedLessons: 16 },
  { subject: "IPA", progress: 60, totalLessons: 25, completedLessons: 15 },
]

export function AccountsOverview() {
  const [subjects] = useState(initialProgress)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false)

  const totalProgress = Math.round(subjects.reduce((sum, subject) => sum + subject.progress, 0) / subjects.length)
  const totalLessons = subjects.reduce((sum, subject) => sum + subject.totalLessons, 0)
  const completedLessons = subjects.reduce((sum, subject) => sum + subject.completedLessons, 0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Progress Belajar</CardTitle>
        <BookOpen className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalProgress}%</div>
        <p className="text-xs text-muted-foreground">Progress keseluruhan pembelajaran</p>
        <div className="mt-4 space-y-2">
          {subjects.map((subject) => (
            <div key={subject.subject} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{subject.subject}</span>
              <div className="text-right">
                <span className="text-sm font-medium">{subject.progress}%</span>
                <p className="text-xs text-muted-foreground">{subject.completedLessons}/{subject.totalLessons} pelajaran</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button size="sm" onClick={() => setIsAddSubjectModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Study
          </Button>
          <Button size="sm" variant="outline">
            <Trophy className="mr-2 h-4 w-4" /> Prestasi
          </Button>
          <Button size="sm" variant="outline">
            <Folder className="mr-2 h-4 w-4" /> Project
          </Button>
          <Button size="sm" variant="outline">
            <MoreHorizontal className="mr-2 h-4 w-4" /> Lainnya
          </Button>
        </div>
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Pembelajaran</p>
          <p className="text-xs text-blue-700 dark:text-blue-300">{completedLessons} dari {totalLessons} pelajaran selesai</p>
        </div>
      </CardContent>
    </Card>
  )
}
