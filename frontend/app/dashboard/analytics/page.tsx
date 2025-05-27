// app/dashboard/analytics/page.tsx
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { DateRangePicker } from "@/app/dashboard/components/date-range-picker"
import { OverviewTab } from "./components/overview-tab"
import { AnalyticsTab } from "./components/analytics-tab"
import { ReportsTab } from "./components/reports-tab"
import { NotificationsTab } from "./components/notifications-tab"
import { DashboardContent } from "../components/dashboard-content"



// Konten spesifik untuk halaman Analytics
function AnalyticsPageContent() {
  const handleExportData = () => {
    console.log("Exporting data...")
  }

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 lg:p-8 pt-4 sm:pt-6 text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Analitik Pembelajaran</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <DateRangePicker />
          <Button onClick={handleExportData} className="flex items-center gap-2 w-full sm:w-auto">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Ekspor Data</span>
            <span className="sm:hidden">Ekspor</span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsTab />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <ReportsTab />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Halaman utama untuk rute /dashboard/analytics
export default function AnalyticsPage() { // Tetap menggunakan nama AnalyticsPage
  return (
    <DashboardContent>
      <AnalyticsPageContent />
    </DashboardContent>
  );
}