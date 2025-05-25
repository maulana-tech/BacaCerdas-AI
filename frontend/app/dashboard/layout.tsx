// app/dashboard/layout.tsx
import { SettingsProvider } from "./settings/contexts/settings-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardContent } from "./components/dashboard-content";
import { Sidebar } from "@/components/ui/sidebar";
import { TopNav } from "./components/top-nav"; // Pastikan path benar ke TopNav

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <TooltipProvider delayDuration={0}>
        <Sidebar> {/* Sidebar sekarang membungkus semua, bertindak sebagai Context Provider */}
          <div className="flex min-h-screen w-full"> {/* Pastikan lebar penuh */}
            {/* Sidebar akan dirender di sini, di dalam SidebarContext.Provider */}
            
            <div className="flex-1 flex flex-col"> {/* Wrapper untuk TopNav dan DashboardContent */}
              <TopNav /> {/* TopNav dirender di sini */}
              <DashboardContent>{children}</DashboardContent> {/* DashboardContent membungkus konten utama */}
            </div>
          </div>
        </Sidebar>
      </TooltipProvider>
    </SettingsProvider>
  );
}