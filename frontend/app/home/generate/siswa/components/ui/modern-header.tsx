"use client";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModernHeaderProps {
  onBackClick?: () => void;
  totalStories?: number;
}

export default function ModernHeader({
  onBackClick,
  totalStories = 1000,
}: ModernHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

  // GSAP Animation for header
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
      }
    };

    loadGSAP();
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative w-full h-80 bg-background overflow-hidden"
    >
      {/* Background Image/Pattern */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/10 dark:from-background/10 to-white dark:to-foreground/10"></div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[url('/images/hero-pattern-light.webp')] dark:bg-[url('/images/hero-pattern-dark.webp')] bg-cover bg-no-repeat opacity-40"></div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10"></div>
      </div>

      {/* Top Section with Logo */}
      <div className="relative flex items-center justify-between p-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">📚</span>
          </div>
          <span className="text-foreground font-bold text-xl tracking-wide">
            StoryVault
          </span>
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onBackClick}
          className="w-12 h-12 text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all duration-300 rounded-xl border border-border hover:border-border/80 group"
        >
          <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-300" />
        </Button>
      </div>

      {/* Main Content - Centered */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 -mt-16">
        {/* Main Title */}
        <h1 className="text-6xl md:text-7xl font-bold text-foreground text-center mb-4 tracking-tight">
          All Stories
        </h1>

        {/* Subtitle */}
        <p className="text-foreground/80 text-lg font-light text-center">
          Over {totalStories.toLocaleString()}+ stories
        </p>

        {/* Decorative line */}
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-6"></div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </header>
  );
}
