"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const dummyData = [
  { hari: "Sen", nilai: 4 },
  { hari: "Sel", nilai: 3 },
  { hari: "Rab", nilai: 5 },
  { hari: "Kam", nilai: 2 },
  { hari: "Jum", nilai: 6 },
  { hari: "Sab", nilai: 8 },
  { hari: "Min", nilai: 4 },
]

interface ActivityChartProps {
  loading?: boolean
}

export function ActivityChart({ loading = false }: ActivityChartProps) {
  const [data, setData] = useState<typeof dummyData>([])
  const [timeRange, setTimeRange] = useState("minggu")
  
  useEffect(() => {
    if (loading) return
    
    // Simulasi loading data
    const timer = setTimeout(() => {
      setData(dummyData)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [loading])
  
  if (loading) {
    return (
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-9 w-28 bg-gray-200 animate-pulse rounded"></div>
        </CardHeader>
        <CardContent className="px-2">
          <div className="h-64 w-full bg-gray-200 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Aktivitas Membaca</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Rentang Waktu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="minggu">Minggu Ini</SelectItem>
            <SelectItem value="bulan">Bulan Ini</SelectItem>
            <SelectItem value="tahun">Tahun Ini</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="hari" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "rgba(17, 24, 39, 0.8)", 
                border: "none",
                borderRadius: "4px",
                color: "white"
              }}
              labelStyle={{ color: "white" }}
            />
            <Bar 
              dataKey="nilai" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]} 
              name="Jumlah Bacaan"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}