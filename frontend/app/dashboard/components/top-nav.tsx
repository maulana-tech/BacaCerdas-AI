"use client"

import React, { useContext, useEffect, useState } from "react"
import { Notifications } from "./notifications"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSettings } from "@/app/dashboard/settings/contexts/settings-context" 
import { SidebarContext } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import ThemeToggler from "@/components/theme-toggler"
import { ChevronRight, LogOut, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function TopNav() {
  const router = useRouter();
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)
  const { settings } = useSettings();
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

  const onHandleSignOut = () => {
    signOut();
    router.push("/auth/login")
    console.log("User signed out")
  }

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out">
      <div 
        className="flex h-16 items-center justify-between px-3 sm:px-4 md:px-6 transition-all duration-300 ease-in-out"
        style={{ 
          marginLeft: isMobile ? '0px' : (isCollapsed ? '72px' : '288px'),
          paddingLeft: isMobile ? '60px' : '16px'
        }}
      >
        {/* Breadcrumb Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center space-x-2 min-w-0 flex-1">
          <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Link 
              href="/home" 
              className="font-medium text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1"
            >
              Home
            </Link>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                <Link 
                  href={`/${pathSegments.slice(0, index + 1).join("/")}`} 
                  className={cn(
                    "font-medium transition-colors duration-200 hover:text-primary truncate",
                    index === pathSegments.length - 1 
                      ? "text-foreground" 
                      : "text-muted-foreground"
                  )}
                >
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>
        
        {/* Right Side Actions */}
        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggler />
          <Notifications />
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={settings.avatar} alt={settings.fullName} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold">
                    {settings.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2 p-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={settings.avatar} alt={settings.fullName} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold">
                        {settings.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold leading-none">{settings.fullName}</p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">{settings.email}</p>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onHandleSignOut} className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
