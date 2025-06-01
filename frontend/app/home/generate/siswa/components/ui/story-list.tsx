"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EnhancedSearchBar from "./enhanced-search-bar";
import ModernHeader from "./modern-header";

// Interface untuk data cerita
export interface Story {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  image: string;
  publishDate: string;
  views: string;
  comments: number;
  category: string;
}

// Interface untuk props komponen
export interface StoryListProps {
  stories: Story[];
  storiesPerPage?: number;
  searchSuggestions?: string[];
  onBackClick?: () => void;
  onFilterClick?: () => void;
  onSortClick?: () => void;
  onSummarize?: (storyId: string) => void;
  showFeaturedStories?: boolean;
  title?: string;
}

const StoryList = ({
  stories,
  storiesPerPage = 5,
  searchSuggestions = [],
  onBackClick = () => console.log("Back button clicked"),
  onFilterClick = () => console.log("Filter clicked"),
  onSortClick = () => console.log("Sort clicked"),
  onSummarize = (storyId: string) => alert(`Merangkum cerita ${storyId}...`),
  showFeaturedStories = true,
  title = "All Stories",
}: StoryListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const storiesContentRef = useRef<HTMLDivElement>(null);

  // Filter stories based on search query
  const filteredStories = useMemo(() => {
    if (!searchQuery.trim()) return stories;

    return stories.filter(
      (story) =>
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, stories]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);
  const startIndex = (currentPage - 1) * storiesPerPage;
  const endIndex = startIndex + storiesPerPage;
  const currentStories = filteredStories.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to stories content instead of top
    if (storiesContentRef.current) {
      storiesContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // GSAP Animations for content
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");

      // Cards animation
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
              delay: 0.9 + index * 0.1,
              ease: "power2.out",
            }
          );
        }
      });
    };

    loadGSAP();
  }, [currentStories]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Modern Header Component */}
      <ModernHeader onBackClick={onBackClick} totalStories={stories.length} />

      {/* Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Featured Stories Component */}
        

        {/* Enhanced Search Bar */}
        <EnhancedSearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onFilterClick={onFilterClick}
          onSortClick={onSortClick}
          suggestions={searchSuggestions}
        />

        {/* Search Results Info */}
        {searchQuery && (
          <div className="text-sm text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/30 px-4 py-3 rounded-xl border-l-4 border-blue-400 dark:border-blue-500">
            Ditemukan{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {filteredStories.length}
            </span>{" "}
            cerita untuk "<span className="font-medium">{searchQuery}</span>"
          </div>
        )}

        {/* Stories List */}
        {currentStories.length > 0 ? (
          <div ref={storiesContentRef} className="space-y-6 md:space-y-8">
            {currentStories.map((story, index) => (
              <Card
                key={story.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md hover:shadow-lg dark:shadow-gray-900/30 transition-all duration-500 overflow-hidden border-0 dark:border dark:border-gray-700/50 rounded-2xl group"
              >
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
                    {/* Content */}
                    <div className="flex-1 order-2 sm:order-1">
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 border-0 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {story.category}
                        </Badge>
                      </div>

                      <Link href={`/story/${story.id}`}>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {story.title}
                        </h2>
                      </Link>

                      <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-4 md:mb-6 line-clamp-2 md:line-clamp-3 leading-relaxed">
                        {story.subtitle}
                      </p>

                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3 md:mb-4">
                        oleh{" "}
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {story.author}
                        </span>
                      </div>

                      {/* Metadata with Summarize Button */}
                      <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm text-gray-500 dark:text-gray-400">
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSummarize(story.id)}
                          className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300 px-2 md:px-3 py-1 rounded-full"
                        >
                          <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="text-xs font-medium">Summarize</span>
                        </Button>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="flex-shrink-0 order-1 sm:order-2 mx-auto sm:mx-0">
                      <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg dark:shadow-gray-900/30 dark:hover:shadow-gray-900/40 transition-all duration-500 transform group-hover:translate-y-[-3px]">
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
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-3xl md:text-4xl">📚</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl mb-2">
              Tidak ada cerita yang ditemukan
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Coba gunakan kata kunci yang berbeda
            </p>
          </div>
        )}

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 md:mt-16 space-y-4 md:space-y-6">
            {/* Main Pagination Controls */}
            <div className="flex items-center justify-center">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-md dark:shadow-gray-900/30 border border-gray-200/50 dark:border-gray-700/50 p-1.5 md:p-2 flex items-center gap-1 md:gap-2">
                {/* Previous Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all duration-300 ${
                    currentPage === 1
                      ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Sebelumnya</span>
                  <span className="sm:hidden">Prev</span>
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1 mx-1 md:mx-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      const isCurrentPage = currentPage === page;
                      const isNearCurrentPage =
                        Math.abs(page - currentPage) <= 1;
                      const isFirstOrLast = page === 1 || page === totalPages;

                      if (
                        !isNearCurrentPage &&
                        !isFirstOrLast &&
                        totalPages > 5
                      ) {
                        if (page === 2 && currentPage > 4) {
                          return (
                            <span
                              key={page}
                              className="px-2 text-gray-400 dark:text-gray-500 text-sm"
                            >
                              ...
                            </span>
                          );
                        }
                        if (
                          page === totalPages - 1 &&
                          currentPage < totalPages - 3
                        ) {
                          return (
                            <span
                              key={page}
                              className="px-2 text-gray-400 dark:text-gray-500 text-sm"
                            >
                              ...
                            </span>
                          );
                        }
                        if (page !== 2 && page !== totalPages - 1) {
                          return null;
                        }
                      }

                      return (
                        <Button
                          key={page}
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-xl transition-all duration-300 font-medium ${
                            isCurrentPage
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white shadow-md dark:shadow-gray-900/30 scale-105 hover:scale-110"
                              : "text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105"
                          }`}
                        >
                          {page}
                        </Button>
                      );
                    }
                  )}
                </div>

                {/* Next Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all duration-300 ${
                    currentPage === totalPages
                      ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105"
                  }`}
                >
                  <span className="hidden sm:inline">Selanjutnya</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Enhanced Pagination Info */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
              {/* Left: Page Info */}
              <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/30 px-3 md:px-4 py-1.5 md:py-2 rounded-xl">
                  <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Halaman{" "}
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      {currentPage}
                    </span>{" "}
                    dari{" "}
                    <span className="text-purple-600 dark:text-purple-400 font-bold">
                      {totalPages}
                    </span>
                  </span>
                </div>

                <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-700"></div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 px-3 md:px-4 py-1.5 md:py-2 rounded-xl">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Menampilkan{" "}
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {startIndex + 1}-
                      {Math.min(endIndex, filteredStories.length)}
                    </span>{" "}
                    dari{" "}
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {filteredStories.length}
                    </span>{" "}
                    cerita
                  </span>
                </div>
              </div>

              {/* Right: Quick Jump */}
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Lompat ke:</span>
                <div className="flex items-center gap-1 dark:text-gray-200">
                  {[1, Math.ceil(totalPages / 2), totalPages].map(
                    (page, index) => {
                      if (
                        page === currentPage ||
                        (index === 1 && totalPages < 3)
                      )
                        return null;
                      return (
                        <Button
                          key={page}
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-6 h-6 md:w-8 md:h-8 p-0 text-xs rounded-lg border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                        >
                          {page}
                        </Button>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Progress
                </span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 md:h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(currentPage / totalPages) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {Math.round((currentPage / totalPages) * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StoryList;
