"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Eye, MessageCircle, Trash2 } from "lucide-react"

// PERBAIKAN: Impor tipe terpusat dari lib/types


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
import { StoryResponse } from "@/lib/types"

interface StoryCardProps extends StoryResponse {
  compact?: boolean
  onDelete?: (id: string) => Promise<void>
}

export default function StoryCard({ attributes, relationships, compact = false, onDelete }: StoryCardProps) {
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

  // Tampilan Compact (untuk daftar di dashboard guru, misalnya)
  if (compact) {
    return (
      <div className="p-3 sm:p-4 space-y-3 sm:space-y-0 sm:grid sm:grid-cols-12 sm:items-center sm:gap-4 hover:bg-muted/50 rounded-lg transition-colors">
        <div className="sm:col-span-5 lg:col-span-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-muted flex-shrink-0 overflow-hidden">
              {/* PERBAIKAN: Gunakan gambar dari data */}
              <Image src={attributes.thumbnailUrl || "/images/placeholder.png"} alt={attributes.title} fill style={{objectFit: 'cover'}} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm sm:text-base text-foreground truncate">
                {attributes.title || "Untitled Story"}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {/* PERBAIKAN: Tampilkan nama penulis dengan aman */}
                {relationships?.User && `Oleh ${relationships.User.attributes.name} • `}
                {new Date(attributes.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        {/* ... sisa kode untuk tampilan compact tetap sama ... */}
        <div className="sm:col-span-7 lg:col-span-8">
          <div className="flex items-center justify-between gap-2">
            {relationships?.Tag && (
              <Badge variant="outline" className="rounded-lg sm:rounded-xl text-xs">
                {relationships.Tag.attributes.tag || "Uncategorized"}
              </Badge>
            )}
            <div className="flex items-center gap-1 sm:gap-2 ml-auto">
              {/* PERBAIKAN: Arahkan ke halaman detail cerita */}
              <Link href={`/home/generate/siswa/${attributes.id}`}>
                <Badge variant="outline" className="rounded-lg sm:rounded-xl text-xs cursor-pointer hover:bg-muted">
                  Lihat
                </Badge>
              </Link>
              {onDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Badge variant="destructive" className="rounded-lg sm:rounded-xl text-xs cursor-pointer">
                      {isDeleting ? "Menghapus..." : "Hapus"}
                    </Badge>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[90vw] max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-base sm:text-lg">Apakah Anda yakin?</AlertDialogTitle>
                      <AlertDialogDescription className="text-sm sm:text-base">
                        Tindakan ini tidak dapat dibatalkan. Ini akan menghapus cerita "{attributes.title}" secara permanen.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                      <AlertDialogCancel className="w-full sm:w-auto">Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="w-full sm:w-auto bg-red-500 hover:bg-red-600">
                        {isDeleting ? "Menghapus..." : "Hapus"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Tampilan Penuh (untuk halaman daftar cerita siswa)
  return (
    <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-md hover:shadow-lg dark:shadow-slate-900/30 transition-all duration-500 overflow-hidden border border-white/60 dark:border-white/10 rounded-2xl group">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-2xl h-48">
          {/* PERBAIKAN: Gunakan gambar dari data */}
          <Image
            src={attributes.thumbnailUrl || "/images/placeholder-image.png"}
            alt={attributes.title}
            fill
            style={{ objectFit: "cover" }}
            className="group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
           <div className="absolute top-4 left-4">
               <Badge variant="secondary" className="bg-white/90 text-slate-800">
                  {relationships?.Tag?.attributes.tag || "Uncategorized"}
               </Badge>
           </div>
        </div>

        <div className="p-4 sm:p-5">
            <Link href={`/home/generate/siswa/${attributes.id}`}>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer line-clamp-2">
                {attributes.title || "Untitled Story"}
              </h2>
            </Link>

            <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2 leading-relaxed">
              {attributes.content || "No content available."}
            </p>

            <div className="flex justify-between items-center text-xs md:text-sm text-slate-500 dark:text-slate-400">
              {/* PERBAIKAN: Tampilkan nama penulis dengan aman */}
              <span className="font-medium text-slate-700 dark:text-slate-300">
                  Oleh {relationships?.User?.attributes.name || 'Penulis Anonim'}
              </span>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(attributes.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}