import { SettingsProvider } from "./settings/contexts/settings-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Sidebar } from "@/components/ui/sidebar"
import { DashboardContent } from "./components/dashboard-content"
import type React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SettingsProvider>
      <TooltipProvider delayDuration={0}>
        <div className="min-h-screen flex">
          <Sidebar />
          <DashboardContent>{children}</DashboardContent>
        </div>
      </TooltipProvider>
    </SettingsProvider>
  )
}
