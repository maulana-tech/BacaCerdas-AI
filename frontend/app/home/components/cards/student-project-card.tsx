"use client"

import { motion } from "framer-motion"
import { Clock, Eye, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Tutorial } from "@/lib/types"

interface StudentProjectCardProps {
  tutorial: Tutorial
  showCategory?: boolean
}

/**
 * Student Project card component for displaying tutorial/project information
 * Shows duration, level, instructor, and view count
 */
export function StudentProjectCard({ tutorial, showCategory = true }: StudentProjectCardProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-500 text-white"
      case "intermediate":
        return "bg-blue-500 text-white"
      case "advanced":
        return "bg-purple-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
      <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{tutorial.title}</CardTitle>
            {showCategory && (
              <Badge variant="outline" className="rounded-xl">
                {tutorial.category}
              </Badge>
            )}
          </div>
          <CardDescription className="line-clamp-2">{tutorial.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex-grow">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {tutorial.duration}
            </div>
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {tutorial.instructor}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Badge className={`rounded-xl ${getLevelColor(tutorial.level)}`}>
              {tutorial.level}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Eye className="mr-1 h-4 w-4" />
              {tutorial.views} views
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" className="w-full rounded-2xl">
            View Project
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}