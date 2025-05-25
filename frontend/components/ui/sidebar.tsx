// components/ui/sidebar.tsx
"use client";

import { useState, createContext, useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart2,
  Building2,
  Folder,
  MessagesSquare,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

// Buat context untuk state sidebar dan fungsi untuk mengubahnya
type SidebarContextType = {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isMobileOpen: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { name: "Organization", href: "/dashboard/organization", icon: Building2 },
  { name: "Projects", href: "/dashboard/projects", icon: Folder },
  { name: "Chat", href: "/dashboard/chat", icon: MessagesSquare },
];

const bottomNavigation = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export function Sidebar({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const pathname = usePathname();
  // Effect untuk menutup mobile sidebar saat navigasi berubah
  useEffect(() => {
    // Pastikan ini hanya menutup jika memang mobile sidebar sedang terbuka
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  }, [pathname, isMobileOpen, setIsMobileOpen]); // Tambahkan setIsMobileOpen ke dependencies

  const NavItem = ({ item, isBottom = false }: { item: { name: string; href: string; icon: any }; isBottom?: boolean }) => (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.02]",
            pathname === item.href
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            isCollapsed && "justify-center px-2",
          )}
        >
          <item.icon className={cn("h-4 w-4 flex-shrink-0", !isCollapsed && "mr-3")} />
          {!isCollapsed && <span className="truncate">{item.name}</span>}
        </Link>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right" className="flex items-center gap-4">
          {item.name}
        </TooltipContent>
      )}
    </Tooltip>
  );

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }}>
      <TooltipProvider>
        <>
          {/* Mobile overlay */}
          {isMobileOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
          )}

          <div
            className={cn(
              "fixed inset-y-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm transition-all duration-300 ease-in-out border-r border-border/50 shadow-lg",
              // Desktop styles: no shadow, standard background
              "lg:shadow-none lg:bg-background lg:backdrop-blur-none",
              // Desktop width based on isCollapsed state (managed by TopNav)
              // `data-[state]` is a Tailwind variant that works with arbitrary data attributes
              "lg:w-[72px] lg:data-[state=expanded]:w-72", // desktop collapsed: 72px, expanded: 288px
              // Mobile behavior: always w-72, but controlled by translate-x
              "w-72 transform",
              isMobileOpen ? "translate-x-0" : "-translate-x-full", // Mobile slide in/out
              "lg:translate-x-0", // Ensure it's always visible on desktop (override mobile translate)
            )}
            // Add data-state for desktop styling (e.g., using data-[state=expanded])
            data-state={isCollapsed ? "collapsed" : "expanded"}
          >
            {/* Header branding / Logo */}
            <div className="border-border/50">
              <div className={cn("flex h-16 items-center gap-2 px-4", isCollapsed && "justify-center px-2")}>
                {!isCollapsed && (
                  <Link href="/" className="flex items-center font-bold text-foreground hover:text-primary transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center mr-2">
                      <span className="text-primary-foreground font-bold text-sm">BC</span>
                    </div>
                    <span className="text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      BacaCerdas.AI
                    </span>
                  </Link>
                )}
                {/* No toggle button here, it's in TopNav */}
              </div>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}
              </nav>
            </div>

            {/* Bottom Navigation */}
            <div className="border-t border-border/50 p-3">
              <nav className="space-y-1">
                {bottomNavigation.map((item) => (
                  <NavItem key={item.name} item={item} isBottom />
                ))}
              </nav>
            </div>
          </div>
          {children} {/* This renders the rest of the layout (TopNav, HomeContent) */}
        </>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}