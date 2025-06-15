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

// Impor tipe dan layout
import type { Story, StoryTag } from "@/lib/types"
import { HomeAppLayout } from "../../components/home-app-layout"

// Impor data dummy kita
import { studentStories } from "@/lib/data/student-stories-data"
import { storyTags } from "@/lib/data/story-tags-data"
// --- PERBAIKAN: Pastikan nama file ini benar ---
import { dummyUsers } from "@/lib/data/user-data" 


// --- SAKLAR PENGONTROL DATA ---
const USE_DUMMY_DATA = true;

// --- TIPE DATA LOKAL (sebaiknya dipindah ke lib/types.ts nanti) ---
interface UserAttributes {
  id: string;
  name: string;
}

export interface StoryApiResponse {
  attributes: Story & { thumbnailUrl: string };
  relationships: {
    Tag?: { attributes: StoryTag };
    User?: { attributes: UserAttributes };
  };
}

export interface StoryTagApiResponse {
  attributes: StoryTag;
}

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

  const fetchTags = async () => {
    // ... (kode fetch API asli Anda)
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
    // ... (kode fetch API asli Anda)
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
      setStories(data.data)
    } catch (error) {
      console.error("Error fetching stories:", error)
      setError("Failed to load stories. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }
  
  const loadDummyData = () => {
    console.log("Memuat data dummy...");
    const timer = setTimeout(() => {
        const adaptedStories: StoryApiResponse[] = studentStories.map(story => {
            const tagData = storyTags.find(t => t.id === story.tagId);
            const userData = dummyUsers.find(u => u.id === story.userId);

            return {
                attributes: story,
                relationships: {
                    Tag: {
                        attributes: tagData || { id: 'tag-unknown', tag: 'Tanpa Tag' }
                    },
                    User: {
                        attributes: userData || { id: 'user-unknown', name: 'Penulis Anonim' }
                    }
                }
            };
        });
        const adaptedTags: StoryTagApiResponse[] = storyTags.map(tag => ({
            attributes: tag
        }));

        setStories(adaptedStories);
        setTags(adaptedTags);
        setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }

  useEffect(() => {
    if (status === "loading") return
    if (!session && !USE_DUMMY_DATA) {
      router.push("/login")
      return
    }

    if (USE_DUMMY_DATA) {
      loadDummyData();
    } else {
      fetchStories();
      fetchTags();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status])

  
  const filteredAndSortedStories = stories
    .filter(story => {
        if (selectedTag !== "all") {
            return story.relationships?.Tag?.attributes.tag === selectedTag;
        }
        return true;
    })
    .filter(story => 
        story.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.attributes.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
        const dateA = new Date(a.attributes.createdAt).getTime();
        const dateB = new Date(b.attributes.createdAt).getTime();
        return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <HomeAppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Cerita Pembelajaran
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Jelajahi berbagai cerita pembelajaran yang tersedia
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 text-red-500 bg-red-100 p-3 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <p>{error}</p>
          </div>
        )}

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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[300px] rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : filteredAndSortedStories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-300">
              {searchTerm ? "Tidak ada cerita yang sesuai dengan pencarian Anda" : 
               selectedTag !== "all" ? `Tidak ada cerita dengan tag '${selectedTag}'` :
               "Belum ada cerita yang tersedia"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAndSortedStories.map((story) => (
              <StoryCard key={story.attributes.id} {...story} />
            ))}
          </div>
        )}
      </div>
    </HomeAppLayout>
  )
}