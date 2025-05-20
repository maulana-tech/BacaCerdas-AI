"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

interface ProgressCardProps {
  title: string
  value: number
  maxValue: number
  icon: React.ReactNode
  loading?: boolean
}

export function ProgressCard({ title, value, maxValue, icon, loading = false }: ProgressCardProps) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [value])
  
  const percentage = Math.round((value / maxValue) * 100)
  
  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <div className="h-8 w-12 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
          <div className="h-2 w-full bg-gray-200 animate-pulse rounded-full"></div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-bold">{percentage}%</span>
          <div className="text-blue-500">{icon}</div>
        </div>
        <Progress value={progress} max={100} className="h-2" />
        <p className="text-xs text-gray-500 mt-2">{value} dari {maxValue} selesai</p>
      </CardContent>
    </Card>
  )
}