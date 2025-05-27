import { SettingsProvider } from "./settings/contexts/settings-context";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <TooltipProvider delayDuration={0}>
        {/* children di sini akan menjadi DashboardContent, yang kini bertindak sebagai aplikasi shell penuh */}
        {children}
      </TooltipProvider>
    </SettingsProvider>
  );
}