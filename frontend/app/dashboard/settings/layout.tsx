"use client"

import { SettingsProvider } from "./contexts/settings-context"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SettingsProvider>{children}</SettingsProvider>
}