"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";
import { TeacherProjectCardItem, TeacherProjectItem } from "@/app/home/components/cards/teacher-project-card";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  itemClassName,
}: {
  items: TeacherProjectItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!items || items.length === 0) {
      if (scrollerRef.current) {
        scrollerRef.current.innerHTML = ""; // Kosongkan scroller jika tidak ada item
      }
      setStart(false); // Pastikan animasi tidak berjalan
      return; // Keluar lebih awal jika tidak ada item
    }
    addAnimation();
  }, [items, direction, speed]); // Dependensi yang benar

  function addAnimation() {
    if (!containerRef.current || !scrollerRef.current || !items || items.length === 0) {
      return;
    }

    if (direction === "right") {
      scrollerRef.current.style.animationDirection = "reverse";
    } else {
      scrollerRef.current.style.animationDirection = "normal";
    }

    let duration = "80s";
    if (speed === "fast") {
      duration = "40s";
    } else if (speed === "slow") {
      duration = "120s";
    }
    scrollerRef.current.style.setProperty("--animation-duration", duration);

    const oldClones = scrollerRef.current.querySelectorAll('li[data-cloned="true"]');
    oldClones.forEach(clone => clone.remove());

    const scrollerContent = Array.from(scrollerRef.current.children);

    if (scrollerContent.length === items.length) {
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as HTMLLIElement;
        duplicatedItem.setAttribute("aria-hidden", "true");
        duplicatedItem.setAttribute("data-cloned", "true");
        scrollerRef.current!.appendChild(duplicatedItem);
      });
    }
    
    setStart(true);
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && items && items.length > 0 && "animate-scroll", // Terapkan animasi hanya jika 'start' true dan ada item
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            className={cn(
              "w-[280px] sm:w-[300px] md:w-[320px]", // Lebar kartu yang responsif
              "shrink-0 rounded-2xl overflow-hidden", // Pastikan li tidak membatasi border-radius kartu
              itemClassName
            )}
            key={item.id} // Key cukup item.id untuk item asli
          >
            {/* Menggunakan komponen kartu tunggal yang sudah diperbaiki */}
            <TeacherProjectCardItem project={item} />
          </li>
        ))}
      </ul>
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(calc(-100% / 2)); /* Menggeser sejauh setengah dari total lebar (original + clone) */
          }
        }
        .scroller .animate-scroll {
          animation-name: scroll;
          animation-duration: var(--animation-duration, 80s); /* Default duration */
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          /* animation-direction diatur melalui inline style oleh JavaScript */
        }
      `}</style>
    </div>
  );
};