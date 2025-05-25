// app/layout/default-layout.tsx
import { SettingsProvider } from "@/app/dashboard/settings/contexts/settings-context";
import { TooltipProvider } from "@radix-ui/react-tooltip"; // Atau "@/components/ui/tooltip"

import { Sidebar } from "@/components/ui/sidebar"; // Impor Sidebar sebagai provider
import { TopNav } from "@/app/dashboard/components/top-nav"; // Impor TopNav


import type React from "react";

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <TooltipProvider delayDuration={0}>
        {/* children di sini akan menjadi HomeContent, yang kini bertindak sebagai aplikasi shell penuh */}
        {children}
      </TooltipProvider>
    </SettingsProvider>
  );
}