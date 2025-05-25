"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, AlertCircle } from "lucide-react"

const initialAssignments = [
  { 
    id: 1, 
    title: "Essay Bahasa Indonesia", 
    subject: "Bahasa Indonesia", 
    dueDate: "2024-01-15", 
    priority: "high",
    status: "pending" 
  },
  { 
    id: 2, 
    title: "Latihan Soal Matematika", 
    subject: "Matematika", 
    dueDate: "2024-01-18", 
    priority: "medium",
    status: "pending" 
  },
  { 
    id: 3, 
    title: "Laporan Praktikum IPA", 
    subject: "IPA", 
    dueDate: "2024-01-20", 
    priority: "low",
    status: "pending" 
  },
]

export function QuickBillPay() {
  const [assignments, setAssignments] = useState(initialAssignments)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmissionSuccess = (submittedAssignmentId: number) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === submittedAssignmentId 
        ? { ...assignment, status: 'submitted' }
        : assignment
    ).filter(assignment => assignment.status === 'pending'))
    setSelectedAssignment(null)
  }

  const getPriorityColor = (priority: 'high' | 'medium' | 'low'): string => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getDaysUntilDue = (dueDate: string): number => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Tugas Mendatang
        </CardTitle>
      </CardHeader>
      <CardContent>
        {assignments.length > 0 ? (
          <div className="space-y-4">
            {assignments.map((assignment) => {
              const daysLeft = getDaysUntilDue(assignment.dueDate)
              return (
                <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{assignment.title}</p>
                      <Badge className={getPriorityColor(assignment.priority as 'high' | 'medium' | 'low')}>
                        {assignment.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {daysLeft > 0 ? `${daysLeft} hari lagi` : daysLeft === 0 ? 'Hari ini' : 'Terlambat'}
                      </span>
                      {daysLeft <= 1 && (
                        <AlertCircle className="h-3 w-3 text-red-500 ml-1" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onClick={() => setSelectedAssignment(assignment as any)}
                    >
                      Kerjakan
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Tidak ada tugas yang pending</p>
            <p className="text-sm text-muted-foreground">Semua tugas sudah diselesaikan!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}