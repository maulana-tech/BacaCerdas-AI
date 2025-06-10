"use client"

import { FileText, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { StoryApiResponse } from "../action"
import { useState } from "react"

interface RecentStoryCardProps {
  story: StoryApiResponse
  showDetails?: boolean
  onDelete?: (id: string) => Promise<void>
}

export function RecentStoryCard({ story, showDetails = false, onDelete }: RecentStoryCardProps) {
  const { attributes, relationships } = story
  const formattedDate = new Date(attributes.createdAt).toLocaleDateString()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!onDelete) return

    setIsDeleting(true)
    try {
      await onDelete(attributes.id)
    } catch (error) {
      console.error("Failed to delete story:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      className={
        showDetails
          ? "p-3 sm:p-4 space-y-3 sm:space-y-0 sm:grid sm:grid-cols-12 sm:items-center sm:gap-4"
          : "flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 gap-3 sm:gap-0"
      }
    >
      {/* Main content section */}
      <div className={showDetails ? "sm:col-span-5 lg:col-span-4" : ""}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-muted flex-shrink-0">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm sm:text-base text-foreground truncate">
              {attributes.title || "Untitled Story"}
            </p>
            {showDetails ? (
              relationships?.User && (
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground mt-1">
                  Oleh {relationships.User.attributes.name}
                </div>
              )
            ) : (
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Cerita • {formattedDate}</p>
            )}
          </div>
        </div>
      </div>

      {showDetails ? (
        <>
          {/* Type column - hidden on mobile */}
          <div className="hidden sm:block sm:col-span-1 lg:col-span-1">
            <span className="text-xs sm:text-sm text-muted-foreground">Cerita</span>
          </div>

          {/* Content length column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-between sm:justify-start">
              <span className="text-xs sm:text-sm text-muted-foreground">{attributes.content.length} karakter</span>
              <span className="text-xs sm:text-sm text-muted-foreground sm:hidden">{formattedDate}</span>
            </div>
          </div>

          {/* Date and actions column */}
          <div className="sm:col-span-4 lg:col-span-5">
            <div className="flex items-center justify-between gap-2">
              <span className="hidden sm:inline text-xs sm:text-sm text-muted-foreground">{formattedDate}</span>
              <div className="flex items-center gap-1 sm:gap-2 ml-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-lg sm:rounded-xl hover:bg-muted/50"
                  asChild
                >
                  <Link href={`/home/generate/siswa/story/${attributes.id}`}>
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-foreground" />
                  </Link>
                </Button>
                {onDelete && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-lg sm:rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[90vw] max-w-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-base sm:text-lg">Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm sm:text-base">
                          Tindakan ini tidak dapat dibatalkan. Ini akan menghapus cerita "{attributes.title}" secara
                          permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                        <AlertDialogCancel className="w-full sm:w-auto">Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="w-full sm:w-auto bg-red-500 hover:bg-red-600"
                        >
                          {isDeleting ? "Menghapus..." : "Hapus"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Tags and actions container */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            {relationships?.Tag && (
              <Badge variant="outline" className="rounded-lg sm:rounded-xl text-xs">
                {relationships.Tag.attributes.tag || "Uncategorized"}
              </Badge>
            )}
            <div className="flex items-center gap-1 sm:gap-2 ml-auto sm:ml-0">
              <Link href={`/home/generate/siswa/story/${attributes.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-lg sm:rounded-xl text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8 text-foreground hover:bg-muted/50"
                >
                  Edit
                </Button>
              </Link>
              {onDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-lg sm:rounded-xl text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Menghapus..." : "Hapus"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[90vw] max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-base sm:text-lg">Apakah Anda yakin?</AlertDialogTitle>
                      <AlertDialogDescription className="text-sm sm:text-base">
                        Tindakan ini tidak dapat dibatalkan. Ini akan menghapus cerita "{attributes.title}" secara
                        permanen.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                      <AlertDialogCancel className="w-full sm:w-auto">Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="w-full sm:w-auto bg-red-500 hover:bg-red-600"
                      >
                        {isDeleting ? "Menghapus..." : "Hapus"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
