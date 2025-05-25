import { SettingsProvider } from "@/app/dashboard/settings/contexts/settings-context"
import { Sidebar } from "@/components/ui/sidebar"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { HomeContent } from "../components/home-content"
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
          <HomeContent>{children}</HomeContent>
        </div>
      </TooltipProvider>
    </SettingsProvider>
  )
}
