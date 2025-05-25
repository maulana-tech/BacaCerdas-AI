"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

const data = [
  { month: "Jan", progress: 78 },
  { month: "Feb", progress: 82 },
  { month: "Mar", progress: 85 },
  { month: "Apr", progress: 88 },
  { month: "May", progress: 91 },
  { month: "Jun", progress: 94 },
  { month: "Jul", progress: 92 },
  { month: "Aug", progress: 96 },
  { month: "Sep", progress: 98 },
  { month: "Oct", progress: 95 },
  { month: "Nov", progress: 97 },
  { month: "Dec", progress: 99 },
]

export function RevenueChart() {
  const { theme } = useTheme()

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <Card className="border-none shadow-lg">
          <CardContent className="p-2">
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-sm text-muted-foreground">Kemajuan Pembelajaran: {payload[0].value}%</p>
          </CardContent>
        </Card>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis
          dataKey="month"
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={theme === "dark" ? "#888888" : "#333333"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="progress"
          stroke={theme === "dark" ? "#3b82f6" : "#2563eb"}
          strokeWidth={2}
          dot={{ fill: theme === "dark" ? "#3b82f6" : "#2563eb" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
