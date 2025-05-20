"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useState, useEffect } from "react"

interface ReadingGoalsProps {
  loading?: boolean
}

export function ReadingGoals({ loading = false }: ReadingGoalsProps) {
  const [progress, setProgress] = useState(0)
  const target = 10
  const current = 7
  
  useEffect(() => {
    if (loading) return
    
    const timer = setTimeout(() => {
      setProgress((current / target) * 100)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [loading, current, target])
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="h-40 w-40 bg-gray-200 animate-pulse rounded-full"></div>
          <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mt-4"></div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Target Membaca Bulan Ini</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-40 h-40">
          <CircularProgressbar
            value={progress}
            text={`${current}/${target}`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: `hsl(var(--primary))`,
              textColor: 'hsl(var(--foreground))',
              trailColor: 'hsl(var(--muted))',
            })}
          />
        </div>
        <p className="text-sm text-center mt-4">
          {current} dari {target} buku selesai dibaca
        </p>
      </CardContent>
    </Card>
  )
}