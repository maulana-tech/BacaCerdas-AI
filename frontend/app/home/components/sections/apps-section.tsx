"use client";

import { Download, Search, PlusCircle, Users, FileText } from "lucide-react";
import { motion } from "framer-motion";

import { HeroSection } from "./hero-section";
import { AppCard } from "../cards/app-card"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apps as allAppsData, projects, recentFiles, tutorials } from "@/lib/data/sample-data";
import { useSession } from "next-auth/react";
import type { App } from "@/lib/types";
import { FileRow } from "../cards/file-row";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@radix-ui/react-progress";
import { StudentProjectCard } from "../cards/student-project-card";
import { StoryFileRow } from "../cards/story-file-row";
import { useStories } from "../../hooks/use-stories";
import { Skeleton } from "@/components/ui/skeleton";
import { RecentStoryCard } from "../../generate/siswa/component/recent-story-card";

export function AppsSection() {
  const { data: session, status } = useSession(); 
  const userRole = status === "loading" ? null : session?.user.role; 
  
  // Menggunakan React Query untuk mengambil data cerita
  const { data: stories, isLoading: isStoriesLoading, refetch: refetchStories } = useStories();

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

  const deleteStory = async (id: string) => {
    try {
      const response = await fetch(`/api/stories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete story');
      }

      // Refresh stories after deletion
      refetchStories();
    } catch (error) {
      console.error('Error deleting story:', error);
      throw error;
    }
  };

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

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">File Terbaru</h2>
            <Button variant="ghost" className="rounded-2xl text-primary">Lihat Semua</Button>
          </div>
          <div className="rounded-3xl border">
            {isStoriesLoading ? (
              // Tampilkan skeleton loading saat data sedang dimuat
              <div className="p-4 space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-2xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-16 rounded-xl" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y">
                {stories?.data.map((story) => (
                  <RecentStoryCard 
                    key={story.attributes.id} 
                    story={story}
                    showDetails={true}
                    onDelete={deleteStory}
                  />
                ))}
                {stories?.data.length === 0 && (
                  <p className="p-4 text-center text-muted-foreground">
                    No stories found
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Proyek Aktif</h2>
            <Button variant="ghost" className="rounded-2xl text-primary">Lihat Semua</Button>
          </div>
          <div className="rounded-3xl border">
            <div className="grid grid-cols-1 divide-y">
              {projects.slice(0, 3).map((project) => (
                <motion.div key={project.name} whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }} className="p-4">
                  {/* ... detail proyek ... */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{project.name}</h3>
                    <Badge variant="outline" className="rounded-xl">Tenggat {project.dueDate}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2 rounded-xl" />
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center"><Users className="mr-1 h-4 w-4" />{project.members} anggota</div>
                    <div className="flex items-center"><FileText className="mr-1 h-4 w-4" />{project.files} file</div>
                  </div>
                </motion.div>
              ))}
            </div>
             {projects.length === 0 && <p className="p-4 text-muted-foreground">Tidak ada proyek aktif.</p>}
          </div>
        </section>
      </div>

      {/* Section Student Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Student Projects</h2>
            <p className="text-sm text-muted-foreground">Explore projects created by students and instructors</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="rounded-2xl">Newest First</Button>
            <Button variant="outline" className="rounded-2xl p-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="white"/>
                <path d="M4 4H8V8H4V4Z" fill="currentColor"/>
                <path d="M10 4H14V8H10V4Z" fill="currentColor"/>
                <path d="M16 4H20V8H16V4Z" fill="currentColor"/>
                <path d="M4 10H8V14H4V10Z" fill="currentColor"/>
                <path d="M10 10H14V14H10V10Z" fill="currentColor"/>
                <path d="M16 10H20V14H16V10Z" fill="currentColor"/>
                <path d="M4 16H8V20H4V16Z" fill="currentColor"/>
                <path d="M10 16H14V20H10V16Z" fill="currentColor"/>
                <path d="M16 16H20V20H16V16Z" fill="currentColor"/>
              </svg>
            </Button>
            <Button variant="outline" className="rounded-2xl p-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="white"/>
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Projects grid */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button size="sm" variant="outline" className="rounded-full">All</Button>
              <Button size="sm" variant="outline" className="rounded-full">Featured</Button>
              <Button size="sm" variant="outline" className="rounded-full">Recent</Button>
              <Button size="sm" variant="outline" className="rounded-full">Popular</Button>
              <Button size="sm" variant="outline" className="rounded-full">Following</Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tutorials.slice(0, 8).map((tutorial) => (
                <StudentProjectCard key={tutorial.title} tutorial={tutorial} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}