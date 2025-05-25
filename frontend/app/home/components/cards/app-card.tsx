"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { App } from "@/lib/types"

interface AppCardProps {
  app: App
  showProgress?: boolean
  showCategory?: boolean
}

/**
 * Reusable app card component
 * Displays app information with optional progress and category badges
 */
export function AppCard({ app, showProgress = false, showCategory = false }: AppCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
      <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">{app.icon}</div>
            {app.new ? (
              <Badge className="rounded-xl bg-amber-500">New</Badge>
            ) : showCategory ? (
              <Badge variant="outline" className="rounded-xl">
                {app.category}
              </Badge>
            ) : (
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-2xl">
                <Star className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <CardTitle className="text-lg">{app.name}</CardTitle>
          <CardDescription>{app.description}</CardDescription>
          {showProgress && app.progress < 100 && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm">
                <span>Installation</span>
                <span>{app.progress}%</span>
              </div>
              <Progress value={app.progress} className="h-2 mt-1 rounded-xl" />
            </div>
          )}
        </CardContent>
        <CardFooter className={showCategory ? "flex gap-2" : ""}>
          <Button variant="secondary" className={showCategory ? "flex-1 rounded-2xl" : "w-full rounded-2xl"}>
            {app.progress < 100 ? "Continue Install" : "Open"}
          </Button>
          {showCategory && (
            <Button variant="outline" size="icon" className="rounded-2xl">
              <Star className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
