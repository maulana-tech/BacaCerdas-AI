"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SummarizedCourse } from "@/lib/types" // Menggunakan tipe yang konsisten
import { ArrowLeft, Calendar, FileText, Share2, Download } from "lucide-react"
import { getSummaryById } from "../action"
import { Skeleton } from "@/components/ui/skeleton"

export default function ReadSummaryPage() {
  const [summary, setSummary] = useState<SummarizedCourse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const router = useRouter()
  const summaryId = params.id as string

  useEffect(() => {
    if (summaryId) {
      const loadSummary = async (id: string) => {
        try {
          setLoading(true)
          const data = await getSummaryById(id)
          if (data) {
            setSummary(data)
          } else {
            setError("Rangkuman tidak ditemukan.")
          }
        } catch (err) {
          console.error("Error loading summary:", err)
          setError("Gagal memuat rangkuman.")
        } finally {
          setLoading(false)
        }
      }
      loadSummary(summaryId)
    }
  }, [summaryId])

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleShare = async () => {
    if (navigator.share && summary) {
      try {
        await navigator.share({
          title: summary.Course?.name || "Rangkuman",
          text: `Baca rangkuman untuk mata pelajaran: ${summary.Course?.name}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link berhasil disalin ke clipboard!")
    }
  }

  const handleDownload = () => {
    if (!summary) return
    const title = summary.Course?.name || "Rangkuman";
    const textContent = summary.summary
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<p>/gi, "")
      .replace(/<\/p>/gi, "\n")
      .replace(/<h[1-6]>/gi, "## ")
      .replace(/<\/h[1-6]>/gi, "\n\n")
      .replace(/<[^>]*>/g, "")
      .replace(/\n+/g, "\n")
      .trim()
      
    const fullContent = `${title}\n\nDibuat pada: ${formatDate(summary.createdAt)}\n\n---\n\n${textContent}`
    const blob = new Blob([fullContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-10 w-32 mb-8" />
        <Card>
          <CardHeader className="p-8">
            <Skeleton className="h-6 w-48 mb-6" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-5 w-1/2" />
          </CardHeader>
          <CardContent className="p-8">
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-11/12 mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !summary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Rangkuman tidak dapat ditampilkan."}</p>
          <Button onClick={() => router.push('/home/summary/siswa')}>Kembali ke Daftar</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
       <div className="border-b sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push('/home/summary/siswa')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Daftar
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader className="p-6 md:p-8 border-b">
            <Badge variant="secondary" className="mb-4">
              <FileText className="h-4 w-4 mr-2" />
              Rangkuman Mata Pelajaran
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mt-2">
              {summary.Course?.name || "Tanpa Judul"}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Dibuat pada {formatDate(summary.createdAt)}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: summary.summary }}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}