"use client";

import { motion } from "framer-motion";
import { HeroSection } from "./hero-section";
import { AppCard } from "../cards/app-card";
import { FileRow } from "../cards/file-row";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { apps, recentFiles, projects } from "@/lib/data/sample-data";
import { FileText, Users, ArrowRight } from "lucide-react";

import Link from "next/link";
import { TeacherProjectsDisplay } from "../cards/teacher-project-card";


export function HomeSection() {
  const studentVisibleApps = apps.filter(
    (app) => app.category === "Quiz" || app.category === "Summary" || app.new
  ).slice(0, 4);

  return (
    <div className="space-y-8">
      <HeroSection
        title="Selamat Datang di Dasbor Belajarmu!"
        description="Temukan materi, kuis, dan proyek yang telah disiapkan untukmu."
        primaryAction={
          <Button className="bg-white text-black hover:bg-gray-200 rounded-2xl">
            Mulai Belajar
          </Button>
        }
        secondaryAction={
          <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 rounded-2xl">
            Lihat Panduan
          </Button>
        }
        gradient="bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500" 
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Aplikasi Untukmu</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {studentVisibleApps.length > 0 ? (
            studentVisibleApps.map((app) => (
              <AppCard key={app.name} app={app} showProgress={false} />
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">Belum ada aplikasi yang tersedia untukmu.</p>
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
            <div className="grid grid-cols-1 divide-y">
              {recentFiles.slice(0, 4).map((file) => ( <FileRow key={file.name} file={file} /> ))}
            </div>
            {recentFiles.length === 0 && <p className="p-4 text-muted-foreground">Tidak ada file terbaru.</p>}
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

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Sorotan Komunitas</h2>
        <Button asChild variant="outline" className="w-full md:w-auto">
          <Link href="#">
            View All Courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        </div>
        <TeacherProjectsDisplay 
          speed="fast"
        />
      </section>
    </div>
  );
}