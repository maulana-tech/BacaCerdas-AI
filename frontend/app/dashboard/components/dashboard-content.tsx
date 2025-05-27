"use client";

import React, { useState, useEffect } from "react";

import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { TopNav } from "@/app/dashboard/components/top-nav"; // Pastikan path benar

import { AccountsOverview } from "./accounts-overview";
import { BusinessMetrics } from "./business-metrics";
import { QuickBillPay } from "./quick-assignnment-submission";
import { RecentTransactions } from "./recent-learning-activities";


function DashboardLayoutContent() {
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
      {/* TopNav akan tetap di atas dan mengambil padding kiri dari style prop */}
      <TopNav className="w-full" style={{ paddingLeft: contentPaddingLeft }} />

      {/* Div ini adalah flex-1 mengisi sisa ruang vertikal */}
      <div className="flex-1">
        {/* Tambahkan padding-top untuk menggeser konten ke bawah TopNav yang fixed */}
        <main className="w-full p-3 sm:p-4 md:p-6 pr-4 md:pr-6" style={{ paddingTop: topNavHeight }}>
          {/* Konten spesifik dashboard */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <AccountsOverview />
              </div>
              <div className="lg:col-span-1">
                <RecentTransactions />
              </div>
              <div className="lg:col-span-1">
                <QuickBillPay />
              </div>
            </div>
            <BusinessMetrics />
          </div>
        </main>
      </div>
    </div>
  );
}

export function DashboardContent() {
  return (
    <Sidebar> {/* Sidebar adalah provider untuk SidebarContext */}
      <DashboardLayoutContent /> {/* Render komponen helper di sini */}
    </Sidebar>
  );
}