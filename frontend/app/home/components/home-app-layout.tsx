"use client";

import React, { useState, useEffect, PropsWithChildren } from "react";
import { Sidebar, useSidebar as useRealSidebar } from "@/components/ui/sidebar"; //
import { TopNav } from "@/app/dashboard/components/top-nav"; //
import { cn } from "@/lib/utils"; 


function HomeAppLayoutStructure({ children }: PropsWithChildren) {
  const { isCollapsed, isMobileOpen } = useRealSidebar(); // Hook from sidebar.tsx
  const [isMobile, setIsMobile] = useState(false);

  const sidebarWidthCollapsed = '72px';
  const sidebarWidthExpanded = '288px'; // Default expanded width for the sidebar
  const topNavHeight = '64px'; // Corresponds to h-16 in TopNav styling


  const contentPaddingLeft = isMobile
    ? (isMobileOpen ? sidebarWidthExpanded : '0px')
    : (isCollapsed ? sidebarWidthCollapsed : sidebarWidthExpanded);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // Tailwind's 'lg' breakpoint
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []); // Effect runs once on mount and cleans up on unmount

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen w-full bg-background transition-all duration-300 ease-in-out"
      )}
      style={{ paddingLeft: contentPaddingLeft }} // Apply dynamic padding
    >
      {/* Top Navigation Bar */}
      <TopNav className="w-full" style={{ paddingLeft: contentPaddingLeft }} /> {/* */}
      
      {/* Main Content Area */}
      <div className="flex-1">
        <main className="w-full p-3 sm:p-4 md:p-6 pr-4 md:pr-6" style={{ paddingTop: topNavHeight }}>
          {children} {/* Page-specific content will be rendered here */}
        </main>
      </div>
    </div>
  );
}


export function HomeAppLayout({ children }: PropsWithChildren) {

  return (
    <Sidebar>
      <HomeAppLayoutStructure>
        {children}
      </HomeAppLayoutStructure>
    </Sidebar>
  );
}