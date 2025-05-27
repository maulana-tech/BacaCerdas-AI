// app/dashboard/layout.tsx
import { SettingsProvider } from "./settings/contexts/settings-context";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({
  children, // children di sini akan menjadi komponen DashboardContent
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <TooltipProvider delayDuration={0}>
        {children}
      </TooltipProvider>
    </SettingsProvider>
  );
}