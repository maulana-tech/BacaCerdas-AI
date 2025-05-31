"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BookOpen, Search, Brain, Sparkles, CheckCircle, BarChart3 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const decorativeRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      })

      // Animate title with elegant entrance
      tl.fromTo(
        titleRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
      )

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8",
      )

      // Animate cards with sophisticated stagger
      tl.fromTo(
        cardsRef.current,
        {
          y: 60,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: {
            amount: 0.6,
            from: "start",
          },
        },
        "-=0.5",
      )

      // Animate decorative elements
      tl.fromTo(
        decorativeRef.current,
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 0.6,
          duration: 1.5,
          ease: "back.out(1.7)",
          stagger: 0.2,
        },
        "-=1",
      )

      // Subtle floating animation for decorative elements
      decorativeRef.current.forEach((el, index) => {
        gsap.to(el, {
          y: -15,
          rotation: 5,
          duration: 3 + index * 0.5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.8,
        })
      })

      // Enhanced hover animations for cards
      cardsRef.current.forEach((card) => {
        const mockup = card.querySelector(".feature-mockup")
        const content = card.querySelector(".feature-content")

        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -12,
            scale: 1.03,
            duration: 0.4,
            ease: "power2.out",
          })
          gsap.to(mockup, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: "back.out(1.7)",
          })
          gsap.to(content, {
            y: -3,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          })
          gsap.to(mockup, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(content, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        card.addEventListener("mouseenter", handleMouseEnter)
        card.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          card.removeEventListener("mouseenter", handleMouseEnter)
          card.removeEventListener("mouseleave", handleMouseLeave)
        }
      })

      // Parallax effect for background elements
      gsap.to(".parallax-slow", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(".parallax-fast", {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToCardsRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  const addToDecorativeRefs = (el: HTMLDivElement | null) => {
    if (el && !decorativeRef.current.includes(el)) {
      decorativeRef.current.push(el)
    }
  }

  const features = [
    {
      title: "Ringkasan Pintar",
      description:
        "Teknologi AI yang membantu merangkum materi pelajaran menjadi poin-poin penting yang mudah dipahami.",
      icon: BookOpen,
      bgStyle: "bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700",
      mockupBg: "bg-white dark:bg-slate-700",
      accentColor: "text-blue-600 dark:text-blue-400",
      mockupContent: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <BookOpen className="w-4 h-4" />
            <span>Materi Pembelajaran</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <div className="h-2 bg-blue-200 dark:bg-blue-700 rounded flex-1"></div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <div className="h-2 bg-green-200 dark:bg-green-700 rounded flex-1"></div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-yellow-500" />
              <div className="h-2 bg-yellow-200 dark:bg-yellow-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Analisis Mendalam",
      description: "Membantu menganalisis teks dan materi pembelajaran untuk pemahaman yang lebih komprehensif.",
      icon: Search,
      bgStyle: "bg-gradient-to-br from-purple-500 to-pink-500",
      mockupBg: "bg-white/90 dark:bg-slate-800/90",
      accentColor: "text-white",
      mockupContent: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center">
                <Search className="w-4 h-4 text-purple-600 dark:text-purple-300" />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Analisis Expert</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-700 dark:to-pink-700 rounded-lg"></div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-blue-700 dark:to-cyan-700 rounded-lg"></div>
            <div className="w-8 h-8 bg-gradient-to-br from-green-200 to-emerald-200 dark:from-green-700 dark:to-emerald-700 rounded-lg"></div>
          </div>
        </div>
      ),
    },
    {
      title: "Pembelajaran Adaptif",
      description: "Sistem yang menyesuaikan dengan tingkat pemahaman dan gaya belajar untuk hasil optimal.",
      icon: Brain,
      bgStyle: "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600",
      mockupBg: "bg-white dark:bg-slate-700",
      accentColor: "text-slate-700 dark:text-slate-300",
      mockupContent: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <BarChart3 className="w-4 h-4" />
            <span>Progress Tracking</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Matematika</span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded">
                85%
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Bahasa Indonesia</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded">
                92%
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>IPA</span>
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300 rounded">
                78%
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-background relative overflow-hidden"
    >
      {/* Subtle background decorations with parallax */}
      <div
        ref={addToDecorativeRefs}
        className="parallax-slow absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-blue-200/30 rounded-full blur-xl"
      ></div>
      <div
        ref={addToDecorativeRefs}
        className="parallax-fast absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-blue-200/30 rounded-full blur-lg"
      ></div>
      <div
        ref={addToDecorativeRefs}
        className="parallax-slow absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-blue-200/30 rounded-full blur-lg"
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-6 border border-blue-200/50 dark:border-blue-700/50">
            <Sparkles className="w-4 h-4 text-blue-500 hover:text-blue-600 transition-colors" />
            <span className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">Fitur Unggulan</span>
          </div>

          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight"
          >
            Belajar Lebih <span className="text-blue-500 hover:text-blue-600 transition-colors">Efektif</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Teknologi AI canggih yang dirancang khusus untuk mendukung perjalanan belajar yang lebih optimal
          </p>
        </div>

        {/* Sisanya tetap sama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                ref={addToCardsRefs}
                className={`group relative ${feature.bgStyle} p-8 lg:p-10 rounded-2xl lg:rounded-3xl border border-white/60 dark:border-white/10 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden`}
              >
                {/* Mockup Preview */}
                <div className="feature-mockup mb-6">
                  <div
                    className={`${feature.mockupBg} p-4 rounded-xl shadow-sm border border-white/50 dark:border-slate-600/50 backdrop-blur-sm`}
                  >
                    {feature.mockupContent}
                  </div>
                </div>

                {/* Content */}
                <div className="feature-content relative z-10">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 dark:bg-black/20 rounded-xl backdrop-blur-sm">
                      <IconComponent className={`w-6 h-6 ${feature.accentColor}`} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl lg:text-2xl font-bold mb-3 ${feature.accentColor} transition-colors duration-300`}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className={`${feature.accentColor} opacity-80 leading-relaxed text-sm lg:text-base`}>
                    {feature.description}
                  </p>
                </div>

                {/* Subtle decorative element */}
                <div className="absolute top-6 right-6 w-2 h-2 bg-white/40 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
