"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Sparkles, BookOpen, Zap } from "lucide-react"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const decorativeRef = useRef<HTMLDivElement[]>([])
  const featuresRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for entrance animations
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
      })

      // Title entrance with elegant slide up
      mainTl.fromTo(
        titleRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
      )

      // Subtitle follows smoothly
      mainTl.fromTo(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      )

      // Features with stagger
      mainTl.fromTo(
        featuresRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.3",
      )

      // Button entrance with bounce
      mainTl.fromTo(
        buttonRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.3)",
        },
        "-=0.2",
      )

      // Decorative elements entrance
      mainTl.fromTo(
        decorativeRef.current,
        {
          scale: 0,
          opacity: 0,
          rotation: -180,
        },
        {
          scale: 1,
          opacity: 0.4,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.5)",
          stagger: 0.2,
        },
        "-=0.6",
      )

      // Floating animation for decorative elements
      decorativeRef.current.forEach((el, index) => {
        gsap.to(el, {
          y: -12,
          rotation: 8,
          duration: 3 + index * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 1,
        })
      })

      // Button hover animation setup
      if (buttonRef.current) {
        const button = buttonRef.current
        const arrow = button.querySelector(".arrow-icon")

        const handleMouseEnter = () => {
          const tl = gsap.timeline()

          tl.to(button, {
            scale: 1.05,
            y: -2,
            duration: 0.3,
            ease: "power2.out",
          }).to(
            arrow,
            {
              x: 4,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.3",
          )
        }

        const handleMouseLeave = () => {
          const tl = gsap.timeline()

          tl.to(button, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          }).to(
            arrow,
            {
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.3",
          )
        }

        button.addEventListener("mouseenter", handleMouseEnter)
        button.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          button.removeEventListener("mouseenter", handleMouseEnter)
          button.removeEventListener("mouseleave", handleMouseLeave)
        }
      }

      // Parallax effect for background elements
      gsap.to(".parallax-cta", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToDecorativeRefs = (el: HTMLDivElement | null) => {
    if (el && !decorativeRef.current.includes(el)) {
      decorativeRef.current.push(el)
    }
  }

  const addToFeaturesRefs = (el: HTMLDivElement | null) => {
    if (el && !featuresRef.current.includes(el)) {
      featuresRef.current.push(el)
    }
  }

  const features = [
    {
      icon: BookOpen,
      text: "Ringkasan Otomatis",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      text: "Analisis Cepat",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Sparkles,
      text: "Pembelajaran Adaptif",
      gradient: "from-emerald-500 to-teal-500",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-background relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div
        ref={addToDecorativeRefs}
        className="parallax-cta absolute top-20 left-12 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-blue-200/30 rounded-full blur-xl"
      ></div>
      <div
        ref={addToDecorativeRefs}
        className="parallax-cta absolute top-32 right-16 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-blue-200/30 rounded-full blur-lg"
      ></div>
      <div
        ref={addToDecorativeRefs}
        className="parallax-cta absolute bottom-24 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-blue-200/30 rounded-full blur-lg"
      ></div>
      <div
        ref={addToDecorativeRefs}
        className="parallax-cta absolute bottom-32 right-1/3 w-12 h-12 bg-gradient-to-br from-blue-200/30 to-blue-200/30 rounded-full blur-lg"
      ></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main content */}
        <div className="mb-12">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 dark:from-slate-200 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent leading-tight"
          >
            Siap untuk Meningkatkan
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Pengalaman Membaca Anda?
            </span>
          </h2>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                ref={addToFeaturesRefs}
                className="flex items-center gap-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm px-4 py-3 rounded-full border border-white/80 dark:border-slate-700/80 shadow-sm"
              >
                <div className={`p-2 rounded-full bg-gradient-to-r ${feature.gradient}`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature.text}</span>
              </div>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <Link
            ref={buttonRef}
            href="/auth/login"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg lg:text-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer mb-5"
          >
            <span>Mulai Sekarang</span>
            <ArrowRight className="arrow-icon w-5 h-5 transition-transform duration-300" />
          </Link>

          {/* Additional info */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Tanpa kartu kredit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Setup dalam 2 menit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Dukungan 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
