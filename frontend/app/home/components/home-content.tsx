// components/home-content.tsx (hanya bagian HomeLayoutContent yang relevan)
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Sidebar } from "@/components/ui/sidebar";
import { TopNav } from "@/app/dashboard/components/top-nav"; // Pastikan path benar

import { HomeSection } from "./sections/home-section";
import { AppsSection } from "./sections/apps-section";

import { useSidebar } from "@/components/ui/sidebar";


function HomeLayoutContent() {
  const { isCollapsed, isMobileOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("home");
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
      // Padding kiri untuk seluruh area konten (termasuk TopNav dan main)
      style={{ paddingLeft: contentPaddingLeft }}
    >
      {/* TopNav akan tetap di atas dan mengambil padding kiri dari style prop */}
      <TopNav className="w-full" style={{ paddingLeft: contentPaddingLeft }} />

      <div className="flex-1">
        {/* Tambahkan padding-top untuk menggeser konten ke bawah TopNav yang fixed */}
        <main className="w-full p-3 sm:p-4 md:p-6 pr-4 md:pr-6" style={{ paddingTop: topNavHeight }}>
          <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList className="grid w-full max-w-[600px] grid-cols-5 rounded-2xl p-1">
                <TabsTrigger value="home" className="rounded-xl data-[state=active]:rounded-xl">
                  Home
                </TabsTrigger>
                <TabsTrigger value="apps" className="rounded-xl data-[state=active]:rounded-xl">
                  Apps
                </TabsTrigger>
                <TabsTrigger value="files" className="rounded-xl data-[state=active]:rounded-xl">
                  Files
                </TabsTrigger>
                <TabsTrigger value="projects" className="rounded-xl data-[state=active]:rounded-xl">
                  Projects
                </TabsTrigger>
                <TabsTrigger value="learn" className="rounded-xl data-[state=active]:rounded-xl">
                  Learn
                </TabsTrigger>
              </TabsList>
              <div className="hidden md:flex gap-2">
                <Button variant="outline" className="rounded-2xl">
                  <Download className="mr-2 h-4 w-4" />
                  Install App
                </Button>
                <Button className="rounded-2xl">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="home" className="mt-0">
                  <HomeSection />
                </TabsContent>

                <TabsContent value="apps" className="mt-0">
                  <AppsSection />
                </TabsContent>

                <TabsContent value="files" className="mt-0">
                  <div className="text-center py-12 space-y-4">
                    <h2 className="text-2xl font-semibold mb-2">Files Section</h2>
                    <p className="text-muted-foreground">Files management interface coming soon...</p>
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="mt-0">
                  <div className="text-center py-12 space-y-4">
                    <h2 className="text-2xl font-semibold">Projects Section</h2>
                    <p className="text-muted-foreground">Project management interface coming soon...</p>
                  </div>
                </TabsContent>

                <TabsContent value="learn" className="mt-0">
                  <div className="text-center py-12 space-y-4">
                    <h2 className="text-2xl font-semibold">Learn Section</h2>
                    <p className="text-muted-foreground">Learning platform interface coming soon...</p>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

// --- Komponen HomeContent Utama (Tidak Berubah) ---
export function HomeContent() {
  return (
    <Sidebar>
      <HomeLayoutContent />
    </Sidebar>
  );
}