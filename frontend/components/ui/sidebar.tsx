"use client";

import { useState, createContext, useContext } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BarChart2,
  Building2,
  Folder,
  MessagesSquare,
  Settings,
  HelpCircle,
  Menu,
  PanelLeft,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

// Buat context untuk state sidebar
type SidebarContextType = {
  isCollapsed: boolean;
}

export const SidebarContext = createContext<SidebarContextType>({ isCollapsed: false });

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { name: "Organization", href: "/dashboard/organization", icon: Building2 },
  { name: "Projects", href: "/dashboard/projects", icon: Folder },
  { name: "Chat", href: "/dashboard/chat", icon: MessagesSquare },
]

const bottomNavigation = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
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
  )

  return (
    <SidebarContext.Provider value={{ isCollapsed }}>
      <TooltipProvider>
        <>
          {/* Mobile overlay */}
          {isMobileOpen && (
            <div 
              className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
              onClick={() => setIsMobileOpen(false)}
            />
          )}
          
          {/* Mobile toggle button */}
          <button
            className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background rounded-md shadow-lg border"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle sidebar"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <div
            className={cn(
              "fixed inset-y-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm transition-all duration-300 ease-in-out border-r border-border/50 shadow-lg lg:shadow-none lg:bg-background lg:backdrop-blur-none",
              isCollapsed ? "w-[72px]" : "w-72",
              isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            )}
          >
            {/* Header */}
            <div className="border-b border-border/50">
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
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "ml-auto h-8 w-8 hover:bg-accent transition-all duration-200", 
                    isCollapsed && "ml-0"
                  )}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <PanelLeft className={cn(
                    "h-4 w-4 transition-transform duration-300 text-foreground", 
                    isCollapsed && "rotate-180"
                  )} />
                  <span className="sr-only">{isCollapsed ? "Expand" : "Collapse"} Sidebar</span>
                </Button>
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
        </>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}
