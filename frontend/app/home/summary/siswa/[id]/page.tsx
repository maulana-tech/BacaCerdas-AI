"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Summary } from "@/lib/types"
import { ArrowLeft, Calendar, FileText, Share2, Download, Edit } from "lucide-react"
import Link from "next/link"
import { getSummaryById } from "../action"

export default function ReadSummaryPage() {
  const [summary, setSummary] = useState<Summary | null>(null)
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
          const data = await getSummaryById(id) // <- Menggunakan action
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

  // Sisa kode (formatDate, handleShare, handleDownload, dan JSX) tetap sama
  // karena tidak bergantung pada cara data diambil (Supabase vs API).
  // ... (salin sisa kode dari file asli Anda di sini)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleShare = async () => {
    if (navigator.share && summary) {
      try {
        await navigator.share({
          title: summary.title,
          text: `Baca rangkuman: ${summary.title}`,
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
    const textContent = summary.content
      .replace(/<[^>]*>/g, "\n")
      .replace(/\n+/g, "\n")
      .trim()
    const fullContent = `${summary.title}\n\n${textContent}`
    const blob = new Blob([fullContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${summary.title}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Memuat rangkuman...</p>
        </div>
      </div>
    )
  }

  if (error || !summary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => router.back()}>Kembali</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Link href={`/summary?id=${summary.id}`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <div className="p-8 border-b bg-gradient-to-r from-purple-100 to-blue-100">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800">
                <FileText className="h-3 w-3 mr-1" />
                Rangkuman
              </Badge>
              {summary.source_document && (
                <Badge variant="outline" className="ml-2">
                  Dari: {summary.source_document}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{summary.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Dibuat {formatDate(summary.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-em:text-gray-700 prose-ul:text-gray-700 prose-ol:text-gray-700"
              dangerouslySetInnerHTML={{ __html: summary.content }}
            />
          </div>
          <div className="p-8 border-t bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Terakhir diperbarui: {formatDate(summary.updatedAt)}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Bagikan
                </Button>
                <Link href={`/summary?id=${summary.id}`}>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Rangkuman
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}