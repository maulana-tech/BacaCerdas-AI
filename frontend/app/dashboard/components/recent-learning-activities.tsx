import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Video, FileText, Trophy, Clock } from "lucide-react"

const activities = [
  { 
    id: 1, 
    title: "Menyelesaikan Video: Aljabar Dasar", 
    subject: "Matematika", 
    type: "video", 
    date: "2024-01-10", 
    duration: "15 menit",
    points: 50,
    icon: Video
  },
  { 
    id: 2, 
    title: "Mengumpulkan Tugas: Essay Puisi", 
    subject: "Bahasa Indonesia", 
    type: "assignment", 
    date: "2024-01-09", 
    duration: "2 jam",
    points: 100,
    icon: FileText
  },
  { 
    id: 3, 
    title: "Membaca Materi: Sistem Tata Surya", 
    subject: "IPA", 
    type: "reading", 
    date: "2024-01-08", 
    duration: "30 menit",
    points: 25,
    icon: BookOpen
  },
]

const getTypeColor = (type: 'video' | 'assignment' | 'reading' | 'achievement' | string) => {
  switch (type) {
    case 'video': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'assignment': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'reading': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getTypeLabel = (type: 'video' | 'assignment' | 'reading' | 'achievement' | string) => {
  switch (type) {
    case 'video': return 'Video'
    case 'assignment': return 'Tugas'
    case 'reading': return 'Bacaan'
    default: return 'Aktivitas'
  }
}

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Aktivitas Belajar Terbaru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.slice(0, 4).map((activity) => {
            const IconComponent = activity.icon
            return (
              <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <IconComponent className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <Badge className={getTypeColor(activity.type)}>
                      {getTypeLabel(activity.type)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{activity.subject}</span>
                    <span>{activity.date}</span>
                    {activity.duration !== '-' && <span>{activity.duration}</span>}
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-3 w-3 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                      +{activity.points}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <Button className="w-full mt-4" variant="outline">
          Lihat Semua Aktivitas
        </Button>
      </CardContent>
    </Card>
  )
}
