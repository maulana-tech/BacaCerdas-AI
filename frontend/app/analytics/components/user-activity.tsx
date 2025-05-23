import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const userActivities = [
  {
    id: "1",
    user: "Sari Dewi",
    action: "Menyelesaikan Matematika Bab 5",
    time: "2 menit yang lalu",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    user: "Ahmad Rizki",
    action: "Mengumpulkan tugas Bahasa Indonesia",
    time: "10 menit yang lalu",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "3",
    user: "Maya Sari",
    action: "Meraih prestasi IPA tingkat lanjut",
    time: "15 menit yang lalu",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "4",
    user: "Budi Santoso",
    action: "Memulai kursus Bahasa Inggris",
    time: "30 menit yang lalu",
    avatar: "https://github.com/shadcn.png",
  },
]

export function UserActivity() {
  return (
    <div className="space-y-4">
      {userActivities.map((activity) => (
        <Card key={activity.id} className="p-4">
          <CardContent className="flex items-center p-0">
            <Avatar className="h-10 w-10">
              <AvatarImage src={activity.avatar} alt={activity.user} />
              <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{activity.user}</p>
              <p className="text-xs text-muted-foreground">{activity.action}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
