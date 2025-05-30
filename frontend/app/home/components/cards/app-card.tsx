"use client";

import { motion } from "framer-motion";
import { Plus, Star, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { App } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AppCardProps {
  app: App;
  showProgress?: boolean;
  showCategory?: boolean;
}

export function AppCard({ app, showProgress = false, showCategory = false }: AppCardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const userRole = status === "loading" ? "STUDENT" : session?.role || "STUDENT";

  const getButtonText = () => {
    if (userRole === "TEACHER") {
      return "Buat"; // Untuk Guru
    }
    return "Lihat"; // Untuk Siswa (atau peran lain default)
  };

  const handleButtonClick = () => {
    if (userRole === "TEACHER") {
      if (app.id === 1) {
        router.push("/home/generate/guru/");
      } else if (app.id === 2) {
        router.push("/home/quiz/guru/");
      } else if (app.id === 3) {
        router.push("/home/summarize/guru/");
      }
    } else {
      if (app.id === 1) {
        router.push("/home/generate/siswa/");
      } else if (app.id === 2) {
        router.push("/home/quiz/siswa/");
      } else if (app.id === 3) {
        router.push("/home/summarize/siswa/");
      }
    }
  };

  if (status === "loading") {
    return (
      <Card className="overflow-hidden rounded-3xl border-2 animate-pulse">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/50"></div>
            <div className="h-6 w-12 rounded-xl bg-muted/50"></div>
          </div>
        </CardHeader>
        <CardContent className="pb-2 space-y-2">
          <div className="h-5 w-3/4 rounded bg-muted/50"></div>
          <div className="h-4 w-full rounded bg-muted/50"></div>
          <div className="h-4 w-2/3 rounded bg-muted/50"></div>
        </CardContent>
        <CardFooter>
          <Button disabled className="w-full rounded-2xl bg-muted/50 h-10"></Button>
        </CardFooter>
      </Card>
    );
  }

  const ButtonIconComponent = userRole === "TEACHER" ? Plus : Eye;

  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
      <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              {typeof app.icon === 'string' ? <img src={app.icon} alt="" className="h-6 w-6"/> : app.icon }
            </div>
            {app.new ? (
              <Badge className="rounded-xl bg-amber-500 text-white">New</Badge>
            ) : showCategory && app.category ? (
              <Badge variant="outline" className="rounded-xl">
                {app.category}
              </Badge>
            ) : (
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-2xl">
                <Star className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <CardTitle className="text-lg">{app.name}</CardTitle>
          <CardDescription>{app.description}</CardDescription>
          {showProgress && app.progress !== undefined && app.progress < 100 && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className={showCategory ? "flex gap-2 pt-2" : "pt-2"}>
          <Button
            variant={userRole === "TEACHER" ? "default" : "secondary"}
            className={showCategory ? "flex-1 rounded-2xl" : "w-full rounded-2xl"}
            onClick={handleButtonClick}
          >
            {/* Menggunakan ButtonIconComponent yang dinamis */}
            <ButtonIconComponent className="mr-2 h-4 w-4" />
            {getButtonText()}
          </Button>
          {showCategory && (
            <Button variant="outline" size="icon" className="rounded-2xl">
              <Star className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}