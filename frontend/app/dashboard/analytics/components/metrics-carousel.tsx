"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Trophy, TrendingUp, Target, Award } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

const metrics = [
  {
    title: "Total Siswa Aktif",
    value: "2,847",
    icon: Users,
    change: "+12.3%",
    description: "Siswa yang aktif belajar bulan ini",
  },
  {
    title: "Materi Diselesaikan",
    value: "15,234",
    icon: BookOpen,
    change: "+8.7%",
    description: "Total materi yang telah diselesaikan",
  },
  {
    title: "Pencapaian Prestasi",
    value: "1,847",
    icon: Trophy,
    change: "+15.2%",
    description: "Prestasi yang diraih siswa",
  },
  {
    title: "Tingkat Penyelesaian",
    value: "87.5%",
    icon: Target,
    change: "+2.1%",
    description: "Rata-rata tingkat penyelesaian tugas",
  },
  {
    title: "Sertifikat Diterbitkan",
    value: "456",
    icon: Award,
    change: "+22.4%",
    description: "Sertifikat yang telah diterbitkan",
  },
  {
    title: "Kemajuan Pembelajaran",
    value: "94.2%",
    icon: TrendingUp,
    change: "+5.8%",
    description: "Rata-rata kemajuan pembelajaran siswa",
  },
]

export function MetricsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % metrics.length)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + metrics.length) % metrics.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating])

  const transitionEndHandler = () => {
    setIsAnimating(false)
    if (currentIndex === metrics.length - 1) {
      carouselRef.current!.style.transition = "none"
      setCurrentIndex(0)
      setTimeout(() => {
        carouselRef.current!.style.transition = "transform 0.3s ease-in-out"
      }, 50)
    } else if (currentIndex === 0) {
      carouselRef.current!.style.transition = "none"
      setCurrentIndex(metrics.length - 1)
      setTimeout(() => {
        carouselRef.current!.style.transition = "transform 0.3s ease-in-out"
      }, 50)
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={transitionEndHandler}
      >
        {metrics.map((metric, index) => (
          <Card key={index} className="w-full flex-shrink-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <metric.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">{metric.change}</p>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <Button variant="outline" size="sm" onClick={prevSlide} disabled={isAnimating}>
          ←
        </Button>
        <Button variant="outline" size="sm" onClick={nextSlide} disabled={isAnimating}>
          →
        </Button>
      </div>
    </div>
  )
}
