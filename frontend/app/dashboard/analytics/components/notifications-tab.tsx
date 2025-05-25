"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Bell, AlertTriangle, TrendingUp, BookOpen, Trophy, Users } from "lucide-react"

const notificationTypes = [
  { id: "student_activity", label: "Aktivitas Siswa", icon: Users },
  { id: "assignment_alerts", label: "Peringatan Tugas", icon: AlertTriangle },
  { id: "progress_updates", label: "Update Kemajuan", icon: TrendingUp },
  { id: "learning_trends", label: "Tren Pembelajaran", icon: BookOpen },
  { id: "achievement_reports", label: "Laporan Prestasi", icon: Trophy },
  { id: "system_notifications", label: "Notifikasi Sistem", icon: Bell },
]

export function NotificationsTab() {
  const [notifications, setNotifications] = useState({
    student_activity: true,
    assignment_alerts: true,
    progress_updates: false,
    learning_trends: true,
    achievement_reports: false,
    system_notifications: true,
  })

  const toggleNotification = (id: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [id as keyof typeof notifications]: !prev[id as keyof typeof notifications] }))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Pengaturan Notifikasi</h3>
        <Button variant="outline">Simpan Pengaturan</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {notificationTypes.map((type) => (
          <Card key={type.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <type.icon className="mr-2 h-4 w-4" />
                {type.label}
              </CardTitle>
              <Switch
                checked={notifications[type.id as keyof typeof notifications]}
                onCheckedChange={() => toggleNotification(type.id as keyof typeof notifications)}
              />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {type.id === "student_activity" && "Dapatkan notifikasi tentang aktivitas belajar siswa"}
                {type.id === "assignment_alerts" && "Peringatan untuk tugas yang mendekati deadline"}
                {type.id === "progress_updates" && "Update kemajuan pembelajaran siswa"}
                {type.id === "learning_trends" && "Tren dan pola pembelajaran terbaru"}
                {type.id === "achievement_reports" && "Laporan pencapaian dan prestasi siswa"}
                {type.id === "system_notifications" && "Notifikasi sistem dan pemeliharaan"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
