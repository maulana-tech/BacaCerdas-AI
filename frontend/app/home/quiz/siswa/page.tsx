// frontend/app/home/quiz/siswa/page.tsx

"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HomeAppLayout } from "../../components/home-app-layout";
import { studentQuizzes } from "@/lib/data/student-quizzes-data";
import type { Quiz } from "@/lib/types";
import { FileText } from "lucide-react";

export default function StudentQuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi pemuatan data
    const timer = setTimeout(() => {
      setQuizzes(studentQuizzes);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HomeAppLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Daftar Kuis
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Pilih salah satu kuis di bawah ini untuk menguji pemahamanmu.
          </p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-[200px] animate-pulse bg-slate-100 dark:bg-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{quiz.title}</CardTitle>
                  <CardDescription className="line-clamp-3 h-[60px]">{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                   <div className="flex items-center text-sm text-muted-foreground">
                       <FileText className="h-4 w-4 mr-2" />
                       <span>{quiz.content.length} Pertanyaan</span>
                   </div>
                </CardContent>
                <CardFooter>
                  {/* Link ini akan mengarahkan ke halaman mengerjakan kuis */}
                  <Link href={`/home/quiz/siswa/${quiz.id}`} className="w-full">
                    <Button className="w-full">Mulai Kuis</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </HomeAppLayout>
  );
}