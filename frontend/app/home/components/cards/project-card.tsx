"use client"

import { motion } from "framer-motion"
import { FileText, Share2, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
}

/**
 * Project card component for displaying project information
 * Shows progress, team members, and file count
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
      <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{project.name}</CardTitle>
            <Badge variant="outline" className="rounded-xl">
              Due {project.dueDate}
            </Badge>
          </div>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2 rounded-xl" />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              {project.members} members
            </div>
            <div className="flex items-center">
              <FileText className="mr-1 h-4 w-4" />
              {project.files} files
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="secondary" className="flex-1 rounded-2xl">
            Open Project
          </Button>
          <Button variant="outline" size="icon" className="rounded-2xl">
            <Share2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
