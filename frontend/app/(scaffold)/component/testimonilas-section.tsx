"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote, Star } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const decorativeRef = useRef<HTMLDivElement[]>([])

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
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
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

      // Cards with refined stagger
      mainTl.fromTo(
        cardsRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.95,
          rotationY: 15,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: {
            amount: 0.5,
            from: "start",
          },
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
          opacity: 0.3,
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
          y: -10,
          rotation: 5,
          duration: 3 + index * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 1,
        })
      })

      // Enhanced hover animations for cards
      cardsRef.current.forEach((card, index) => {
        const quote = card.querySelector(".quote-icon")
        const avatar = card.querySelector(".avatar")
        const content = card.querySelector(".card-content")
        const stars = card.querySelectorAll(".star")

        // Subtle continuous animation for stars
        stars.forEach((star, i) => {
          gsap.to(star, {
            scale: 1.1,
            duration: 2 + i * 0.3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.5 + i * 0.2,
          })
        })

        const handleMouseEnter = () => {
          const tl = gsap.timeline()

          tl.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
          })
            .to(
              quote,
              {
                scale: 1.2,
                rotation: 10,
                duration: 0.3,
                ease: "back.out(1.5)",
              },
              "-=0.3",
            )
            .to(
              avatar,
              {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out",
              },
              "-=0.2",
            )
            .to(
              content,
              {
                y: -2,
                duration: 0.2,
                ease: "power2.out",
              },
              "-=0.2",
            )
        }

        const handleMouseLeave = () => {
          const tl = gsap.timeline()

          tl.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          })
            .to(
              quote,
              {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out",
              },
              "-=0.3",
            )
            .to(
              avatar,
              {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              },
              "-=0.2",
            )
            .to(
              content,
              {
                y: 0,
                duration: 0.2,
                ease: "power2.out",
              },
              "-=0.2",
            )
        }

        card.addEventListener("mouseenter", handleMouseEnter)
        card.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          card.removeEventListener("mouseenter", handleMouseEnter)
          card.removeEventListener("mouseleave", handleMouseLeave)
        }
      })

      // Parallax effect for background elements
      gsap.to(".parallax-testimonial", {
        yPercent: -40,
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

  const testimonials = [
    {
      name: "Catur Setyono",
      role: "Mahasiswa",
      quote: "BacaCerdas-AI membantu saya memahami materi kuliah yang kompleks dengan lebih mudah.",
      rating: 5,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    },
    {
      name: "Muh Maulana F",
      role: "Peneliti",
      quote: "Saya menggunakan platform ini untuk menganalisis paper penelitian dan hasilnya sangat memuaskan.",
      rating: 5,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
    },
    {
      name: "Fawaz",
      role: "Profesional",
      quote: "Fitur ringkasan menghemat banyak waktu saya dalam membaca laporan panjang.",
      rating: 5,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
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
        className="parallax-testimonial absolute top-16 left-8 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-blue-200/30 rounded-full blur-xl"
      ></div>
      <div
        ref={addToDecorativeRefs}
        className="parallax-testimonial absolute top-32 right-12 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-blue-200/30 rounded-full blur-lg"
      ></div>
      <div
        ref={addToDecorativeRefs}
        className="parallax-testimonial absolute bottom-20 left-1/3 w-12 h-12 bg-gradient-to-br from-blue-200/30 to-blue-200/30 rounded-full blur-lg"
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight"
          >
            Apa Kata <span className="text-blue-500 hover:text-blue-600 transition-colors">Pengguna Kami</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Bergabunglah dengan ribuan pengguna yang telah meningkatkan kemampuan membaca mereka
          </p>
        </div>

        {/* Sisanya tetap sama */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={addToCardsRefs}
              className={`group relative bg-gradient-to-br ${testimonial.bgGradient} p-8 rounded-2xl lg:rounded-3xl border border-white/60 dark:border-white/10 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer overflow-hidden`}
            >
              {/* Quote icon */}
              <div className="quote-icon absolute top-6 right-6 opacity-20">
                <Quote className="w-8 h-8 text-slate-600 dark:text-slate-400" />
              </div>

              {/* Content */}
              <div className="card-content relative z-10">
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="star w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-slate-700 dark:text-slate-300 mb-6 text-base lg:text-lg leading-relaxed italic">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <div
                    className={`avatar w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-lg">{testimonial.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* Decorative gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>

              {/* Subtle decorative dot */}
              <div className="absolute bottom-6 right-6 w-2 h-2 bg-gradient-to-br from-white/40 to-white/20 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full border border-purple-200/50 dark:border-purple-700/50">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Bergabung dengan 10,000+ pengguna aktif
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
