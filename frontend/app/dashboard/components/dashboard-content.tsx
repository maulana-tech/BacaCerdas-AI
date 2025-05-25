"use client";

import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/components/ui/sidebar";
import { TopNav } from "./top-nav";

export function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useContext(SidebarContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="flex-1 bg-background transition-all duration-300 ease-in-out"
      style={{ 
        paddingLeft: isMobile ? '0px' : (isCollapsed ? '72px' : '288px')
      }}
    >
      <TopNav />
      <div className="container mx-auto p-3 sm:p-4 md:p-6 max-w-7xl">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}