"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Story } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Calendar, Clock, Share2, Download, Edit } from "lucide-react"
import Link from "next/link"

export default function ReadStoryPage() {
  const [story, setStory] = useState<Story | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const router = useRouter()
  const storyId = params.id as string

  useEffect(() => {
    if (storyId) {
      loadStory(storyId)
    }
  }, [storyId])

  const loadStory = async (id: string) => {
    try {
      const response = await fetch(`/api/story/${id}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Cerita tidak ditemukan');
      }

      const result = await response.json();
      if (result.data) {
        setStory(result.data);
      } else {
        throw new Error('Data cerita tidak valid');
      }
    } catch (error) {
      console.error("Error loading story:", error);
      setError(error instanceof Error ? error.message : "Gagal memuat cerita");
    } finally {
      setLoading(false);
    }
  }

  /* Using formatDate from utils */

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const textContent = content.replace(/<[^>]*>/g, "")
    const wordCount = textContent.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }

  const handleShare = async () => {
    if (navigator.share && story) {
      try {
        await navigator.share({
          title: story.title,
          text: `Baca cerita: ${story.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link berhasil disalin ke clipboard!")
    }
  }

  const handleDownload = () => {
    if (!story) return
    const textContent = story.content
      .replace(/<[^>]*>/g, "\n")
      .replace(/\n+/g, "\n")
      .trim()
    const fullContent = `${story.title}\n\n${textContent}`
    const blob = new Blob([fullContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${story.title}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat cerita...</p>
        </div>
      </div>
    )
  }

  if (error || !story) {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
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
              <Link href={`/home/generate/guru/edit/${story.id}`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Article Header */}
          <div className="p-8 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-4">
                Cerita
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{story.title}</h1>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Dibuat {formatDate(story.createdAt.toString())}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{estimateReadingTime(story.content)} menit baca</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-em:text-gray-700"
              dangerouslySetInnerHTML={{ __html: story.content }}
            />
          </div>

          {/* Article Footer */}
          <div className="p-8 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Terakhir diperbarui: {formatDate(story.updatedAt.toString())}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Bagikan
                </Button>
                <Link href={`/home/generate/guru/edit/${story.id}`}>
                  <Button size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Cerita
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline">Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
