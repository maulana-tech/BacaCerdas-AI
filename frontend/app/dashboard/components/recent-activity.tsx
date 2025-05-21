"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock } from "lucide-react"
import { useState, useEffect } from "react"

interface Activity {
  id: string
  title: string
  time: string
  type: "read" | "note" | "highlight"
}

const dummyActivities: Activity[] = [
  { id: "1", title: "Membaca 'Filosofi Teras'", time: "2 jam yang lalu", type: "read" },
  { id: "2", title: "Membuat catatan pada 'Atomic Habits'", time: "5 jam yang lalu", type: "note" },
  { id: "3", title: "Menyoroti bagian penting di 'Sapiens'", time: "Kemarin", type: "highlight" },
  { id: "4", title: "Membaca 'Mindset'", time: "2 hari yang lalu", type: "read" },
]

interface RecentActivityProps {
  loading?: boolean
}

export function RecentActivity({ loading = false }: RecentActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  
  useEffect(() => {
    if (loading) return
    
    // Simulasi loading data
    const timer = setTimeout(() => {
      setActivities(dummyActivities)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [loading])
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-3 w-24 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Aktivitas Terbaru</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="rounded-full bg-blue-100 p-2 text-blue-600">
              {activity.type === "read" ? (
                <BookOpen className="h-4 w-4" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}