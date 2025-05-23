import { TopNav } from "@/app/dashboard/components/top-nav"
import { SettingsProvider } from "@/app/settings/contexts/settings-context"
import { Sidebar } from "@/components/ui/sidebar"
import { TooltipProvider } from "@radix-ui/react-tooltip"


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
                <div className="flex-1">
                  <TopNav/>
                  <div className="container mx-auto p-6 max-w-7xl">
                    <main className="w-full">{children}</main>
                  </div>
                </div>
              </div>
            </TooltipProvider>
          </SettingsProvider>
  )
}
