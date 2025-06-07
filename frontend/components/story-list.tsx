"use client"
import { useState, useMemo, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Eye, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EnhancedSearchBar from "./enhanced-search-bar"
import ApiClient from "@/lib/api" // Menggunakan ApiClient yang sudah ada

// Interface untuk data cerita yang digunakan komponen
export interface Story {
  id: string
  title: string
  subtitle?: string
  author: string
  image?: string
  publishDate?: string
  views?: string | number
  comments?: number
  category?: string
  description?: string
  createdAt?: string
  updatedAt?: string
  tags?: string[]
  content?: string
  status?: string
}

// Interface untuk respons API
interface StoryApiResponse {
  id?: string
  title?: string
  subtitle?: string
  description?: string
  author?: string
  image?: string
  publishDate?: string
  views?: number | string
  comments?: number
  category?: string
}

// Interface untuk props komponen
export interface StoryListProps {
  stories?: Story[]
  storiesPerPage?: number
  onBackClick?: () => void
  onFilterClick?: () => void
  onSortClick?: () => void
  onSummarizeProp?: (storyId: string) => void
  showFeaturedStories?: boolean
  title?: string
}

const StoryList = ({
  stories = [],
  storiesPerPage = 5,
  onFilterClick = () => console.log("Filter clicked"),
  onSortClick = () => console.log("Sort clicked"),

}: StoryListProps) => {
  const [internalStories, setInternalStories] = useState<Story[]>(stories)
  const [isLoading, setIsLoading] = useState<boolean>(stories.length === 0)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const cardsRef = useRef<HTMLDivElement[]>([])
  const storiesContentRef = useRef<HTMLDivElement>(null)
  const apiClient = new ApiClient() // Menggunakan ApiClient yang sudah ada

  

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Menggunakan ApiClient untuk mengambil data
      const response = await apiClient.instance.get("/stories", {
        params: {
          search: searchQuery.trim() || undefined,
          limit: storiesPerPage * 3, // Ambil lebih banyak data untuk demo pagination
        }
      })

      // Format data langsung seperti di page.tsx
      if (response.data && Array.isArray(response.data)) {
        const formattedStories: Story[] = response.data.map((item: StoryApiResponse) => ({
          id: item.id || `story-${Math.random().toString(36).substring(2, 9)}`,
          title: item.title || "Judul tidak tersedia",
          subtitle: item.subtitle || item.description || "Deskripsi tidak tersedia",
          author: item.author || "Penulis tidak diketahui",
          image: item.image || "/placeholder.svg?height=120&width=200",
          publishDate: item.publishDate
            ? new Date(item.publishDate).toLocaleDateString("id-ID", {
                month: "short",
                day: "numeric",
              })
            : new Date().toLocaleDateString("id-ID", {
                month: "short",
                day: "numeric",
              }),
          views: typeof item.views === "number" ? item.views.toString() : item.views || "0",
          comments: item.comments || 0,
          category: item.category || "Umum",
        }))
        setInternalStories(formattedStories)
      } else {
        console.warn("Format data API tidak sesuai:", response.data)
        setInternalStories([])
      }
    } catch (err) {
      console.error("Error fetching stories:", err)
      setError(err instanceof Error ? err.message : "Gagal mengambil data cerita.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [searchQuery]) // Re-fetch ketika search query berubah

  // Filter stories based on search query (client-side filtering untuk demo)
  const filteredStories = useMemo(() => {
    if (!searchQuery.trim()) return internalStories
    return internalStories.filter(
      (story) =>
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (story.subtitle?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (story.category?.toLowerCase() || "").includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery, internalStories])

  // Calculate pagination
  const totalPages = Math.ceil(filteredStories.length / storiesPerPage)
  const startIndex = (currentPage - 1) * storiesPerPage
  const endIndex = startIndex + storiesPerPage
  const currentStories = filteredStories.slice(startIndex, endIndex)

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (storiesContentRef.current) {
      storiesContentRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // GSAP Animations for content
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 100, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: 0.1 + index * 0.05,
              ease: "power2.out",
            },
          )
        }
      })
    }

    if (currentStories.length > 0 && !isLoading) {
      loadGSAP()
    }
  }, [currentStories, isLoading])

  // Tampilkan loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-purple-500 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 dark:text-slate-300">Memuat cerita...</p>
        </div>
      </div>
    )
  }

  // Tampilkan error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center space-y-4 max-w-md mx-auto p-6 bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Terjadi Kesalahan</h3>
          <p className="text-slate-600 dark:text-slate-300">{error}</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 pt-6 md:pt-8">
      <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        <EnhancedSearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onFilterClick={onFilterClick}
          onSortClick={onSortClick}
          suggestions={searchSuggestionsList}
        />

        {searchQuery && (
          <div className="text-sm text-slate-600 dark:text-slate-300 bg-blue-50/80 dark:bg-blue-900/20 px-4 py-3 rounded-xl border-l-4 border-blue-400 dark:border-blue-500">
            Ditemukan <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredStories.length}</span>{" "}
            cerita untuk "<span className="font-medium">{searchQuery}</span>"
          </div>
        )}

        {currentStories.length > 0 ? (
          <div ref={storiesContentRef} className="space-y-6 md:space-y-8">
            {currentStories.map((story, index) => (
              <Card
                key={story.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-md hover:shadow-lg dark:shadow-slate-900/30 transition-all duration-500 overflow-hidden border border-white/60 dark:border-white/10 rounded-2xl group"
              >
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
                    <div className="flex-1 order-2 sm:order-1">
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {story.category}
                        </Badge>
                      </div>

                      <Link href={`/story/${story.id}`}>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 md:mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {story.title}
                        </h2>
                      </Link>

                      <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mb-4 md:mb-6 line-clamp-2 md:line-clamp-3 leading-relaxed">
                        {story.subtitle}
                      </p>

                      <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-3 md:mb-4">
                        oleh <span className="font-medium text-slate-700 dark:text-slate-300">{story.author}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                          <span>{story.publishDate}</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                          <Eye className="h-3 w-3 md:h-4 md:w-4" />
                          <span>{story.views}</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                          <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
                          <span>{story.comments}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 order-1 sm:order-2 mx-auto sm:mx-0">
                      <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg dark:shadow-slate-900/30 dark:hover:shadow-slate-900/40 transition-all duration-500 transform group-hover:translate-y-[-3px]">
                        <Image
                          src={story.image || "/placeholder.svg"}
                          alt={story.title}
                          width={200}
                          height={120}
                          className="w-full sm:w-44 h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                          priority={index < 2}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 md:py-16">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <span className="text-3xl md:text-4xl">📚</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl mb-2">
              Tidak ada cerita yang ditemukan
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              Coba gunakan kata kunci yang berbeda atau filter lain.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 md:mt-16 space-y-4 md:space-y-6">
            <div className="flex items-center justify-center">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-md dark:shadow-slate-900/30 border border-white/60 dark:border-white/10 p-1.5 md:p-2 flex items-center gap-1 md:gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all duration-300 ${
                    currentPage === 1
                      ? "text-slate-400 dark:text-slate-600 cursor-not-allowed"
                      : "text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Sebelumnya</span>
                  <span className="sm:hidden">Prev</span>
                </Button>

                <div className="flex items-center gap-1 mx-1 md:mx-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isCurrentPage = currentPage === page
                    const isNearCurrentPage = Math.abs(page - currentPage) <= 1
                    const isFirstOrLast = page === 1 || page === totalPages
                    const showEllipsisStart = page === 2 && currentPage > 4 && totalPages > 5
                    const showEllipsisEnd = page === totalPages - 1 && currentPage < totalPages - 3 && totalPages > 5

                    if (
                      !isNearCurrentPage &&
                      !isFirstOrLast &&
                      totalPages > 5 &&
                      !showEllipsisStart &&
                      !showEllipsisEnd
                    ) {
                      if (page < currentPage && page !== 2 && page !== 1) return null
                      if (page > currentPage && page !== totalPages - 1 && page !== totalPages) return null
                    }

                    if (showEllipsisStart || showEllipsisEnd) {
                      return (
                        <span key={`ellipsis-${page}`} className="px-2 text-slate-400 dark:text-slate-500 text-sm">
                          ...
                        </span>
                      )
                    }

                    return (
                      <Button
                        key={page}
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-xl transition-all duration-300 font-medium ${
                          isCurrentPage
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white shadow-md dark:shadow-slate-900/30 scale-105 hover:scale-110"
                            : "text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105"
                        }`}
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all duration-300 ${
                    currentPage === totalPages
                      ? "text-slate-400 dark:text-slate-600 cursor-not-allowed"
                      : "text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105"
                  }`}
                >
                  <span className="hidden sm:inline">Selanjutnya</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/30 px-3 md:px-4 py-1.5 md:py-2 rounded-xl">
                  <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">
                    Halaman <span className="text-blue-600 dark:text-blue-400 font-bold">{currentPage}</span> dari{" "}
                    <span className="text-purple-600 dark:text-purple-400 font-bold">{totalPages}</span>
                  </span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-slate-300 dark:bg-slate-700"></div>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/60 dark:border-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-xl">
                  <span className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                    Menampilkan{" "}
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {startIndex + 1}-{Math.min(endIndex, filteredStories.length)}
                    </span>{" "}
                    dari{" "}
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredStories.length}</span>{" "}
                    cerita
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Progress</span>
                <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 md:h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${totalPages > 0 ? (currentPage / totalPages) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {totalPages > 0 ? Math.round((currentPage / totalPages) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Daftar saran pencarian (bisa diambil dari API atau hardcoded)
const searchSuggestionsList = [
  "Cerita inspiratif",
  "Dongeng anak",
  "Kisah petualangan",
  "Cerita rakyat",
  "Fabel",
  "Cerita sejarah",
  "Kisah motivasi",
  "Cerita pendidikan",
]

export default StoryList
