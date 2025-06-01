"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/10 dark:from-background/10 to-white dark:to-foreground/10 z-0" />
      <div className="absolute inset-0 bg-[url('/images/hero-pattern-light.webp')] dark:bg-[url('/images/hero-pattern-dark.webp')] bg-cover bg-no-repeat opacity-40 z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              Membaca Lebih Cerdas dengan{" "}
              <span className="text-blue-500 hover:text-blue-600 transition-colors">
                AI
              </span>
            </h1>
            <p className="text-lg text-foreground max-w-xl">
              Platform membaca berbasis AI yang membantu Anda memahami,
              menganalisis, dan mempelajari konten dengan lebih efektif dan
              mendalam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/auth/login">
                <Button
                  size="lg"
                  className="w-full sm:w-auto transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Mulai Gratis
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-foreground border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400 transition-all duration-300 hover:scale-105"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
