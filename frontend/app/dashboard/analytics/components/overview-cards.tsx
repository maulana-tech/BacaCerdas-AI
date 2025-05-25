import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Trophy, TrendingUp } from "lucide-react"

const cards = [
  {
    title: "Total Siswa Aktif",
    icon: Users,
    amount: "2,847",
    description: "+12.5% dari bulan lalu",
    trend: "up",
  },
  {
    title: "Materi Diselesaikan",
    icon: BookOpen,
    amount: "15,234",
    description: "+8.2% dari bulan lalu",
    trend: "up",
  },
  {
    title: "Pencapaian Prestasi",
    icon: Trophy,
    amount: "1,847",
    description: "+15.3% dari bulan lalu",
    trend: "up",
  },
  {
    title: "Tingkat Penyelesaian",
    icon: TrendingUp,
    amount: "87.5%",
    description: "+2.1% dari bulan lalu",
    trend: "up",
  },
]

export function OverviewCards() {
  return (
    <>
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.amount}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
