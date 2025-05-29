"use client";

import { Download, Search, PlusCircle } from "lucide-react";
import { HeroSection } from "./hero-section";
import { AppCard } from "../cards/app-card"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apps as allAppsData } from "@/lib/data/sample-data";
import { useSession } from "next-auth/react";
import type { App } from "@/lib/types";

export function AppsSection() {
  const { data: session, status } = useSession(); 
  const userRole = status === "loading" ? null : session?.role; 

  const getVisibleApps = (appList: App[]): App[] => {
    if (status === "loading" || !userRole) return []; // Tunggu role jelas

    if (userRole === "TEACHER" || userRole === "ROOT") { // Asumsi ROOT adalah peran admin lain
      return appList;
    }
    return []; 
  };

  const newReleaseApps = getVisibleApps(allAppsData.filter(app => app.new));
  const currentAllApps = getVisibleApps(allAppsData);

  // Judul dan deskripsi bisa statis karena ini untuk Teacher
  const heroTitle = "Kelola dan Buat Aplikasi Edukasi";
  const heroDescription = "Gunakan template di bawah untuk membuat materi, kuis, atau ringkasan baru untuk siswa Anda.";

  if (status === "loading") {
      return <div className="text-center py-12"><p>Memuat aplikasi...</p></div>;
  }

  return (
    <div className="space-y-8">
      <HeroSection
        title={heroTitle}
        description={heroDescription}
        primaryAction={
          // Tombol ini selalu untuk Teacher karena section ini untuk Teacher
          <Button className="rounded-2xl">
            <PlusCircle className="mr-2 h-4 w-4" /> Buat Konten Baru
          </Button>
        }
        gradient="bg-gradient-to-r from-pink-600 via-red-600 to-orange-600"
      />

      {/* Filters and Search */}
      <div className="flex flex-wrap gap-3 mb-6 text-foreground">
        <Button variant="outline" className="rounded-2xl text-primary">
          Semua Kategori
        </Button>
        <Button variant="outline" className="rounded-2xl">AI</Button>
        <Button variant="outline" className="rounded-2xl">Kuis</Button>
        <Button variant="outline" className="rounded-2xl">Ringkasan</Button>
        <div className="flex-1"></div>
        <div className="relative w-full md:w-auto mt-3 md:mt-0">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Cari template..." className="w-full rounded-2xl pl-9 md:w-[200px]" />
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Template Rilisan Terbaru</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {newReleaseApps.length > 0 ? (
            newReleaseApps.map((app) => (
              // AppCard akan menampilkan tombol "Buat" karena userRole akan TEACHER
              <AppCard key={app.name} app={app} showProgress={app.progress !== undefined} />
            ))
           ) : (
            <p className="text-muted-foreground col-span-full">Tidak ada template rilisan terbaru.</p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Semua Template Aplikasi</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentAllApps.length > 0 ? (
             currentAllApps.map((app) => (
              // AppCard akan menampilkan tombol "Buat"
              <AppCard key={app.name} app={app} showCategory showProgress={app.progress !== undefined} />
            ))
          ) : (
             <p className="text-muted-foreground col-span-full">Tidak ada template aplikasi.</p>
          )}
        </div>
      </section>
    </div>
  );
}