"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { TopNav } from "@/app/dashboard/components/top-nav";

import { HomeSection } from "./sections/home-section";
import { AppsSection } from "./sections/apps-section";

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen w-full">
    <p>Memuat data pengguna...</p>
  </div>
);

function HomeLayoutContent() {
  const { data: session, status } = useSession();
  const { isCollapsed, isMobileOpen } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);


  const userRole = status === "loading" ? null : session?.user.role || "STUDENT";


  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {

    if (userRole && activeTab === null) {
      setActiveTab(userRole === "TEACHER" ? "apps" : "home");
    }
    if (userRole && activeTab) {
      if (userRole === "STUDENT" && activeTab === "apps") {
        setActiveTab("home");
      } else if (userRole === "TEACHER" && activeTab === "home") {
        setActiveTab("apps");
      }
    }
  }, [userRole, activeTab]);


  const sidebarWidthCollapsed = '72px';
  const sidebarWidthExpanded = '288px';
  const topNavHeight = '64px';

  const contentPaddingLeft = isMobile
    ? (isMobileOpen ? sidebarWidthExpanded : '0px')
    : (isCollapsed ? sidebarWidthCollapsed : sidebarWidthExpanded);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (status === "loading" || !activeTab) {
    return (
       <div
        className="flex flex-col min-h-screen w-full bg-background transition-all duration-300 ease-in-out"
        style={{ paddingLeft: contentPaddingLeft }}
      >
        <TopNav className="w-full" style={{ paddingLeft: contentPaddingLeft }} />
        <div className="flex-1" style={{ paddingTop: topNavHeight }}>
          <div className="flex items-center justify-center h-[calc(100vh-var(--top-nav-height))]">
             <p>Memuat data pengguna dan tampilan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen w-full bg-background transition-all duration-300 ease-in-out"
      style={{ paddingLeft: contentPaddingLeft }}
    >
      <TopNav className="w-full" style={{ paddingLeft: contentPaddingLeft }} />

      <div className="flex-1">
        <main className="w-full p-3 sm:p-4 md:p-6 pr-4 md:pr-6" style={{ paddingTop: topNavHeight }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList className="flex w-full max-w-[600px] rounded-2xl p-1">
                {userRole === "STUDENT" && (
                  <TabsTrigger value="home" className="flex-1 rounded-xl data-[state=active]:rounded-xl">
                    Home
                  </TabsTrigger>
                )}
                {userRole === "TEACHER" && (
                  <TabsTrigger value="apps" className="flex-1 rounded-xl data-[state=active]:rounded-xl">
                    Apps
                  </TabsTrigger>
                )}
                <TabsTrigger value="files" className="flex-1 rounded-xl data-[state=active]:rounded-xl">
                  Files
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex-1 rounded-xl data-[state=active]:rounded-xl">
                  Projects
                </TabsTrigger>
                <TabsTrigger value="learn" className="flex-1 rounded-xl data-[state=active]:rounded-xl">
                  Learn
                </TabsTrigger>
              </TabsList>

              {userRole === "TEACHER" && (
                <div className="hidden md:flex gap-2">
                  <Button variant="outline" className="rounded-2xl text-foreground">
                    <Download className="mr-2 h-4 w-4" />
                    Install App
                  </Button>
                  <Button className="rounded-2xl">
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {userRole === "STUDENT" && activeTab === "home" && (
                  <TabsContent value="home" className="mt-0" forceMount>
                    <HomeSection />
                  </TabsContent>
                )}

                {userRole === "TEACHER" && activeTab === "apps" && (
                  <TabsContent value="apps" className="mt-0" forceMount>
                    <AppsSection />
                  </TabsContent>
                )}

                {/* Konten untuk tab lain yang umum */}
                {activeTab === "files" && (
                  <TabsContent value="files" className="mt-0" forceMount>
                    <div className="text-center py-12 space-y-4">
                      <h2 className="text-2xl font-semibold mb-2">Files Section</h2>
                      <p className="text-muted-foreground">Files management interface coming soon...</p>
                    </div>
                  </TabsContent>
                )}
                {activeTab === "projects" && (
                  <TabsContent value="projects" className="mt-0" forceMount>
                    <div className="text-center py-12 space-y-4">
                      <h2 className="text-2xl font-semibold">Projects Section</h2>
                      <p className="text-muted-foreground">Project management interface coming soon...</p>
                    </div>
                  </TabsContent>
                )}
                {activeTab === "learn" && (
                  <TabsContent value="learn" className="mt-0" forceMount>
                    <div className="text-center py-12 space-y-4">
                      <h2 className="text-2xl font-semibold">Learn Section</h2>
                      <p className="text-muted-foreground">Learning platform interface coming soon...</p>
                    </div>
                  </TabsContent>
                )}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

export function HomeContent() {
  return (
    <Sidebar>
      <HomeLayoutContent />
    </Sidebar>
  );
}