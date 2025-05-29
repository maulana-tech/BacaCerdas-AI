"use client";

import { ArrowRight, CalendarDays, Briefcase, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export interface TeacherProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  projectType: string;
  status: "Aktif" | "Perencanaan" | "Selesai" | "Ditunda";
  subject: string;
  classLevel: string;
  startDate: string;
  dueDate: string;
  progress: number;
  teamMembers: string[];
  studentCount: number | null;
}

const teacherProjects: TeacherProjectItem[] = [
  {
    id: "proj_guru_001",
    title: "Pengembangan Modul Ajar Interaktif Matematika Kelas X",
    description: "Membuat modul ajar digital dengan elemen interaktif untuk meningkatkan pemahaman siswa pada materi Aljabar dan Fungsi.",
    image: "/images/projects/modul-matematika.jpg",
    projectType: "Pengembangan Materi",
    status: "Aktif",
    subject: "Matematika",
    classLevel: "Kelas X",
    startDate: "2025-01-15",
    dueDate: "2025-06-30",
    progress: 45,
    teamMembers: ["Andi Widodo, S.Pd.", "Rina Amelia, S.Si."],
    studentCount: null,
  },
  {
    id: "proj_guru_002",
    title: "Pameran Sains Terpadu Antar Kelas XI",
    description: "Mengkoordinasikan dan menyelenggarakan pameran proyek sains siswa dari berbagai kelas XI sebagai ajang unjuk kreativitas dan pembelajaran.",
    image: "/images/projects/pameran-sains.jpg",
    projectType: "Kegiatan Siswa",
    status: "Perencanaan",
    subject: "IPA Terpadu (Fisika, Kimia, Biologi)",
    classLevel: "Kelas XI",
    startDate: "2025-07-01",
    dueDate: "2025-10-15",
    progress: 15,
    teamMembers: ["Dr. Elara Santoso", "Budi Hartono, M.Pd."],
    studentCount: 120,
  },
  {
    id: "proj_guru_003",
    title: "Implementasi Pembelajaran Berbasis Proyek (PjBL) Topik Lingkungan",
    description: "Merancang dan mengimplementasikan serangkaian pembelajaran berbasis proyek untuk siswa kelas VII dengan tema pelestarian lingkungan.",
    image: "/images/projects/proyek-lingkungan.jpg",
    projectType: "Metodologi Pengajaran",
    status: "Aktif",
    subject: "Ilmu Pengetahuan Alam",
    classLevel: "Kelas VII",
    startDate: "2025-02-01",
    dueDate: "2025-05-20",
    progress: 70,
    teamMembers: ["Siti Aminah, S.Pd."],
    studentCount: 90,
  },
  {
    id: "proj_guru_004",
    title: "Digitalisasi Arsip Nilai dan Portofolio Siswa",
    description: "Memindahkan dan mengelola arsip nilai serta portofolio siswa ke dalam sistem digital untuk kemudahan akses dan analisis.",
    image: "/images/projects/digitalisasi-arsip.jpg",
    projectType: "Administrasi & Teknologi",
    status: "Selesai",
    subject: "Administrasi Sekolah",
    classLevel: "Semua Tingkat",
    startDate: "2024-09-01",
    dueDate: "2025-01-30",
    progress: 100,
    teamMembers: ["Kepala Sekolah", "Staf TU", "Yoga Pratama, S.Kom."],
    studentCount: null,
  }
];

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
};
const getStatusBadgeVariant = (status: TeacherProjectItem["status"]): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Aktif": return "default";
    case "Perencanaan": return "secondary";
    case "Selesai": return "outline";
    case "Ditunda": return "destructive";
    default: return "outline";
  }
};


export function TeacherProjectCardItem({ project }: { project: TeacherProjectItem }) {
  return (
    <Link
      href={`/dashboard/teacher/projects/${project.id}`}
      className="group flex flex-col h-full"
    >
      <Card
        className="overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out flex flex-col flex-1 w-full rounded-2xl h-full"
      >
        <div className="aspect-[5/2] w-full overflow-hidden relative">
          <Image
            src={project.image || "/images/placeholder-project.png"}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-3 flex flex-col flex-1">
          <div className="mb-2 flex items-start justify-between gap-1.5">
            <div className="flex flex-wrap gap-1">
              <Badge variant={getStatusBadgeVariant(project.status)} className="text-xs whitespace-nowrap px-1.5 py-0.5 h-5">
                {project.status}
              </Badge>
              <Badge variant="outline" className="text-xs whitespace-nowrap px-1.5 py-0.5 h-5">
                {project.projectType}
              </Badge>
            </div>
            <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap pt-0.5">
              <CalendarDays className="mr-1 h-3 w-3" />
              <span>{formatDate(project.dueDate)}</span>
            </div>
          </div>
          <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="mb-2 line-clamp-2 text-xs text-muted-foreground flex-1">
            {project.description}
          </p>
          <div className="space-y-0.5 text-xs text-muted-foreground mb-3">
            <div className="flex items-center">
              <Briefcase className="mr-1.5 h-3 w-3" /> {project.subject} ({project.classLevel})
            </div>
            {project.studentCount !== null && project.studentCount > 0 && (
              <div className="flex items-center">
                <Users className="mr-1.5 h-3 w-3" /> {project.studentCount} siswa
              </div>
            )}
          </div>
          <div className="mt-auto">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progres</span>
              <span className="font-semibold text-primary">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-1.5 w-full rounded-full" aria-label={`Progres proyek ${project.progress}%`} />
            <Button variant="outline" size="sm" className="mt-3 w-full h-8 gap-1 rounded-lg text-xs px-2 py-1">
              Kelola Proyek
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function TeacherProjectsDisplay({
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    className,
}: {
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) {
  if (!teacherProjects || teacherProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Tidak ada proyek untuk ditampilkan.</p>
      </div>
    );
  }

  return (
    <div className={className || "py-8"}> {/* Tambahkan padding default jika tidak ada className */}
      <InfiniteMovingCards
        items={teacherProjects}
        direction={direction}
        speed={speed}
        pauseOnHover={pauseOnHover}
      />
    </div>
  );
}