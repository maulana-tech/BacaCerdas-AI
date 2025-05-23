"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const studentPerformanceData = [
  { kategori: "Sangat Baik", jumlah: 450 },
  { kategori: "Baik", jumlah: 1200 },
  { kategori: "Cukup", jumlah: 800 },
  { kategori: "Perlu Perbaikan", jumlah: 300 },
  { kategori: "Kurang", jumlah: 97 },
]

const learningProgressData = [
  { bulan: "Jan", tingkat: 78 },
  { bulan: "Feb", tingkat: 82 },
  { bulan: "Mar", tingkat: 85 },
  { bulan: "Apr", tingkat: 88 },
  { bulan: "May", tingkat: 91 },
  { bulan: "Jun", tingkat: 94 },
]

const subjectPerformanceData = [
  { mata_pelajaran: "Matematika", siswa_aktif: 1200, nilai_rata: 85 },
  { mata_pelajaran: "Bahasa Indonesia", siswa_aktif: 1100, nilai_rata: 88 },
  { mata_pelajaran: "IPA", siswa_aktif: 950, nilai_rata: 82 },
  { mata_pelajaran: "IPS", siswa_aktif: 800, nilai_rata: 86 },
  { mata_pelajaran: "Bahasa Inggris", siswa_aktif: 750, nilai_rata: 79 },
]

export function AnalyticsTab() {
  const { theme } = useTheme()
  const [timeFrame, setTimeFrame] = useState("last_30_days")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Analitik Pembelajaran Detail</h3>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih periode waktu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last_7_days">7 Hari Terakhir</SelectItem>
            <SelectItem value="last_30_days">30 Hari Terakhir</SelectItem>
            <SelectItem value="last_90_days">90 Hari Terakhir</SelectItem>
            <SelectItem value="last_12_months">12 Bulan Terakhir</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Segmentasi Performa Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentPerformanceData}>
                <XAxis dataKey="kategori" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="jumlah" fill={theme === "dark" ? "#3b82f6" : "#2563eb"} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Tingkat Kemajuan Belajar</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={learningProgressData}>
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tingkat" stroke={theme === "dark" ? "#10b981" : "#059669"} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Performa Mata Pelajaran</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformanceData}>
              <XAxis dataKey="mata_pelajaran" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="siswa_aktif" fill={theme === "dark" ? "#8b5cf6" : "#7c3aed"} />
              <Bar dataKey="nilai_rata" fill={theme === "dark" ? "#f59e0b" : "#d97706"} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
