"use client";

import { useContext } from "react";
import { SidebarContext } from "@/components/ui/sidebar";
import { TopNav } from "./top-nav";

export function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useContext(SidebarContext);
  
  return (
    <div className="flex-1 bg-background transition-all duration-300 ease-in-out"
      style={{ paddingLeft: isCollapsed ? '72px' : '288px' }} // 72px saat collapsed, 288px saat expanded
    >
      <TopNav />
      <div className="container mx-auto p-6 max-w-7xl">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}