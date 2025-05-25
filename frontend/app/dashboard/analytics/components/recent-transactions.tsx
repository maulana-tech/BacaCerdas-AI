import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentActivities = [
  {
    id: "1",
    name: "Sari Dewi",
    email: "sari@example.com",
    activity: "Menyelesaikan Matematika Bab 5",
    time: "2 menit yang lalu",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Ahmad Rizki",
    email: "ahmad@example.com",
    activity: "Mengumpulkan tugas Bahasa Indonesia",
    time: "5 menit yang lalu",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "3",
    name: "Maya Sari",
    email: "maya@example.com",
    activity: "Meraih prestasi IPA tingkat lanjut",
    time: "10 menit yang lalu",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "4",
    name: "Budi Santoso",
    email: "budi@example.com",
    activity: "Memulai kursus Bahasa Inggris",
    time: "15 menit yang lalu",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "5",
    name: "Rina Wati",
    email: "rina@example.com",
    activity: "Menonton video pembelajaran IPS",
    time: "20 menit yang lalu",
    avatar: "https://github.com/shadcn.png",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar} alt={activity.name} />
            <AvatarFallback>{activity.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-sm text-muted-foreground">{activity.activity}</p>
          </div>
          <div className="ml-auto font-medium text-sm text-muted-foreground">
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  )
}
