import { TooltipProvider } from "@radix-ui/react-tooltip"
import { SettingsProvider } from "../settings/contexts/settings-context"

import type React from "react"
import { TopNav } from "./components/top-nav"
import { Sidebar } from "../../components/ui/sidebar"


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
                  <TopNav />
                  <div className="container mx-auto p-6 max-w-7xl">
                    <main className="w-full">{children}</main>
                  </div>
                </div>
              </div>
            </TooltipProvider>
          </SettingsProvider>
  )
}
