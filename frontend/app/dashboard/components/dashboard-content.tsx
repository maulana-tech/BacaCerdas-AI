// dashboard-content.tsx
"use client";

import React, { useState, useEffect } from "react";
// Impor komponen Sidebar dan TopNav
import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { TopNav } from "@/app/dashboard/components/top-nav"; // Pastikan path benar

import { cn } from "@/lib/utils";

// Hapus import komponen konten spesifik dashboard dari sini
// import { AccountsOverview } from "./components/accounts-overview";
// import { BusinessMetrics } from "./components/business-metrics";
// import { QuickBillPay } from "./components/quick-assignnment-submission";
// import { RecentTransactions } from "./components/recent-learning-activities";


// --- Komponen Helper Baru untuk Konten Layout Dashboard ---
// Sekarang DashboardLayoutContent akan menerima `children`
function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed, isMobileOpen } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  const sidebarWidthCollapsed = '72px';
  const sidebarWidthExpanded = '288px'; // Asumsi lebar sidebar expanded
  const topNavHeight = '64px'; // h-16 = 64px

  const contentPaddingLeft = isMobile
    ? (isMobileOpen ? sidebarWidthExpanded : '0px')
    : (isCollapsed ? sidebarWidthCollapsed : sidebarWidthExpanded);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className="flex flex-col min-h-screen w-full bg-background transition-all duration-300 ease-in-out"
      style={{ paddingLeft: contentPaddingLeft }}
    >
      <TopNav className="w-full" style={{ paddingLeft: contentPaddingLeft }} />

      <div className="flex-1">
        <main className="w-full p-3 sm:p-4 md:p-6 pr-4 md:pr-6" style={{ paddingTop: topNavHeight }}>
          {/* Render children di sini, yang akan menjadi konten dari halaman seperti AnalyticsPage */}
          {children}
        </main>
      </div>
    </div>
  );
}

// --- Komponen DashboardContent Utama ---
// Komponen ini akan menyediakan SidebarContext.Provider
// dan merender DashboardLayoutContent dengan children-nya.
export function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar>
      <DashboardLayoutContent>{children}</DashboardLayoutContent> {/* Meneruskan children ke DashboardLayoutContent */}
    </Sidebar>
  );
}