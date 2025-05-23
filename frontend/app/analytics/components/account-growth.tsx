"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

const data = [
  { bulan: "Jan", siswa_baru: 120, total_siswa: 1200 },
  { bulan: "Feb", siswa_baru: 150, total_siswa: 1350 },
  { bulan: "Mar", siswa_baru: 180, total_siswa: 1530 },
  { bulan: "Apr", siswa_baru: 200, total_siswa: 1730 },
  { bulan: "May", siswa_baru: 220, total_siswa: 1950 },
  { bulan: "Jun", siswa_baru: 250, total_siswa: 2200 },
]

export function AccountGrowth() {
  const { theme } = useTheme()

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <Card className="border-none shadow-lg">
          <CardContent className="p-2">
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-sm text-muted-foreground">Siswa Baru: {payload[0].value}</p>
            <p className="text-sm text-muted-foreground">Total Siswa: {payload[1].value}</p>
          </CardContent>
        </Card>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="bulan" stroke={theme === "dark" ? "#888888" : "#374151"} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke={theme === "dark" ? "#888888" : "#374151"} fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="siswa_baru" fill={theme === "dark" ? "#3b82f6" : "#2563eb"} radius={[4, 4, 0, 0]} />
        <Bar dataKey="total_siswa" fill={theme === "dark" ? "#10b981" : "#059669"} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
