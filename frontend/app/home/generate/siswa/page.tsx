"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import StoryCard from "./component/story-card"
import { Search, Filter, ArrowUpDown, AlertCircle } from "lucide-react"

import type { StoryApiResponse, StoryTagApiResponse } from "./action"
import { HomeAppLayout } from "../../components/home-app-layout"
import { AlertDialog, AlertDialogDescription } from "@/components/ui/alert-dialog"

export default function SiswaStoriesPage() {
  const [stories, setStories] = useState<StoryApiResponse[]>([])
  const [tags, setTags] = useState<StoryTagApiResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")
  const [selectedTag, setSelectedTag] = useState<string>("all")
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/login")
      return
    }
    fetchStories()
    fetchTags()
  }, [session, status, sortBy, selectedTag])

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/story/tags", {
        method: "GET",
        cache: "no-store"
      })

      if (!response.ok) {
        throw new Error("Failed to fetch tags")
      }

      const data = await response.json()
      setTags(data.data)
    } catch (error) {
      console.error("Error fetching tags:", error)
      setError("Failed to load story tags")
    }
  }

  const fetchStories = async () => {
    try {
      setError(null)
      const response = await fetch("/api/story", {
        method: "GET",
        cache: "no-store"
      })

      if (!response.ok) {
        throw new Error("Failed to fetch stories")
      }

      const data = await response.json()
      let filteredStories = data.data

      // Sort stories based on creation date
      filteredStories = filteredStories.sort((a: StoryApiResponse, b: StoryApiResponse) => {
        if (sortBy === "newest") {
          return new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime()
        } else {
          return new Date(a.attributes.createdAt).getTime() - new Date(b.attributes.createdAt).getTime()
        }
      })

      // Filter by tag if selected
      if (selectedTag !== "all") {
        filteredStories = filteredStories.filter(
          (story: StoryApiResponse) => story.relationships?.Tag?.attributes.tag === selectedTag
        )
      }

      setStories(filteredStories)
    } catch (error) {
      console.error("Error fetching stories:", error)
      setError("Failed to load stories. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Filter stories based on search term
  const filteredStories = stories.filter(story => 
    story.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.attributes.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <HomeAppLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Cerita Pembelajaran
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Jelajahi berbagai cerita pembelajaran yang tersedia
          </p>
        </div>

        {error && (
          <div className="mb-6">
            <AlertDialog open={true}>
            <AlertCircle className="h-4 w-4" />
            <AlertDialogDescription>{error}</AlertDialogDescription>
          </AlertDialog>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Cari cerita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-2xl bg-white dark:bg-slate-800"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() => setSortBy(sortBy === "newest" ? "oldest" : "newest")}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              {sortBy === "newest" ? "Terbaru" : "Terlama"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-2xl">
                  <Filter className="h-4 w-4 mr-2" />
                  {selectedTag === "all" ? "Semua Tag" : selectedTag}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedTag("all")}>
                  Semua Tag
                </DropdownMenuItem>
                {tags.map((tag) => (
                  <DropdownMenuItem 
                    key={tag.attributes.id}
                    onClick={() => setSelectedTag(tag.attributes.tag)}
                  >
                    {tag.attributes.tag}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Story Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[300px] rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : filteredStories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-300">
              {searchTerm ? "Tidak ada cerita yang sesuai dengan pencarian Anda" : 
               selectedTag !== "all" ? `Tidak ada cerita dengan tag ${selectedTag}` :
               "Belum ada cerita yang tersedia"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStories.map((story) => (
              <StoryCard key={story.attributes.id} {...story} />
            ))}
          </div>
        )}
      </div>
    </HomeAppLayout>
  )
}
