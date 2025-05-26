// app/layout/default-layout.tsx
import { SettingsProvider } from "@/app/dashboard/settings/contexts/settings-context";
import { TooltipProvider } from "@radix-ui/react-tooltip"; // Atau "@/components/ui/tooltip"

export default function HomeLayout({ children }: DefaultPageProps) {
  return (
    <SettingsProvider>
      <TooltipProvider delayDuration={0}>
        {/* children di sini akan menjadi HomeContent, yang kini bertindak sebagai aplikasi shell penuh */}
        {children}
      </TooltipProvider>
    </SettingsProvider>
  );
}