"use client";

import { Download, Search, PlusCircle, Users, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ApiClient from "@/lib/api";

import { HeroSection } from "./hero-section";
import { AppCard } from "../cards/app-card"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apps as allAppsData, projects, recentFiles, tutorials } from "@/lib/data/sample-data";
import { useSession } from "next-auth/react";
import type { App, Quiz } from "@/lib/types";
import { FileRow } from "../cards/file-row";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@radix-ui/react-progress";
import { TeacherQuizCard } from "../cards/teacher-quiz-card";
import { StudentProjectCard } from "../cards/student-project-card";
import { StoryFileRow } from "../cards/story-file-row";
import { useStories } from "../../hooks/use-stories";
import { Skeleton } from "@/components/ui/skeleton";
import { RecentStoryCard } from "../../generate/siswa/component/recent-story-card";
import { useState, useEffect } from "react";

export function AppsSection() {
  const { data: session, status } = useSession(); 
  const userRole = status === "loading" ? null : session?.user?.role;
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isQuizzesLoading, setIsQuizzesLoading] = useState(true);
  
  // Menggunakan React Query untuk mengambil data cerita
  const { data: stories, isLoading: isStoriesLoading, refetch: refetchStories } = useStories();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setIsQuizzesLoading(true);
    try {
      const response = await fetch('/api/quiz', {
        method: 'GET',
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quizzes');
      }

      const result = await response.json();
      // Make sure we have the expected data structure
      const quizData = Array.isArray(result.data) ? result.data : [];
      // Validate each quiz has the required structure
      const validQuizzes = quizData.filter((quiz: any) => 
        quiz && 
        typeof quiz === 'object' && 
        quiz.id && 
        quiz.title && 
        Array.isArray(quiz.content)
      );
      setQuizzes(validQuizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setQuizzes([]);
    } finally {
      setIsQuizzesLoading(false);
    }
  };

  useEffect(() => {
    if (userRole === 'TEACHER') {
      fetchQuizzes();
    }
  }, [userRole]);

  const getVisibleApps = (appList: App[]): App[] => {
    if (status === "loading" || !userRole) return []; 
    if (userRole === "TEACHER" || userRole === "ROOT") {
      return appList;
    }
    return []; 
  };

  const newReleaseApps = getVisibleApps(allAppsData.filter(app => app.new));
  const currentAllApps = getVisibleApps(allAppsData);

  const heroTitle = "Kelola dan Buat Aplikasi Edukasi";
  const heroDescription = "Gunakan template di bawah untuk membuat materi, kuis, atau ringkasan baru untuk siswa Anda.";

  if (status === "loading") {
    return <div className="text-center py-12"><p>Memuat aplikasi...</p></div>;
  }

  const deleteStory = async (id: string) => {
    try {
      const apiClient = new ApiClient();
      const api = await apiClient.withAuthServer();
      
      const response = await api.delete(`/stories/${id}`);
      if (!response.data) {
        throw new Error('Failed to delete story');
      }
      refetchStories();
    } catch (error) {
      console.error('Error deleting story:', error);
      throw error;
    }
  };

  const handleQuizDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/quiz/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete quiz');
      }
      
      await fetchQuizzes(); // Refresh the quiz list after deletion
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div className="space-y-8">
      <HeroSection
        title={heroTitle}
        description={heroDescription}
        primaryAction={
          <Button className="rounded-2xl" onClick={() => router.push('/home/generate/guru')}>
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

      {/* Grid Layout for Recent Files and Active Projects */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">File Terbaru</h2>
            <Button variant="ghost" className="rounded-2xl text-primary">Lihat Semua</Button>
          </div>
          <div className="rounded-3xl border">
            {isStoriesLoading ? (
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
                    Belum ada cerita yang dibuat
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

       {/* Teacher Quizzes Section */}
      {userRole === "TEACHER" && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Kuis Saya</h2>
              <p className="text-sm text-muted-foreground">Kelola dan pantau kuis yang Anda buat</p>
            </div>
            <Button 
              variant="outline" 
              className="rounded-2xl"
              onClick={() => router.push('/home/quiz/guru')}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Buat Kuis Baru
            </Button>
          </div>
          
          {isQuizzesLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[200px] rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.isArray(quizzes) ? quizzes.map((quiz) => (
                <TeacherQuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onDelete={() => handleQuizDelete(quiz.id)}
                />
              )) : null}
              {quizzes.length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  Belum ada kuis yang dibuat. Klik "Buat Kuis Baru" untuk memulai.
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}