"use client"
import { useState, useRef, useEffect } from "react"
import { Search, Filter, SortAsc, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface EnhancedSearchBarProps {
  value: string
  onChange: (value: string) => void
  onFilterClick?: () => void
  onSortClick?: () => void
  placeholder?: string
  suggestions?: string[]
}

export default function EnhancedSearchBar({
  value,
  onChange,
  onFilterClick,
  onSortClick,
  placeholder = "Cari cerita, penulis, atau kategori...",
  suggestions = [],
}: EnhancedSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // GSAP Animation
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")

      if (searchRef.current) {
        gsap.fromTo(
          searchRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out" },
        )
      }
    }

    loadGSAP()
  }, [])

  const handleClear = () => {
    onChange("")
    setShowSuggestions(false)
  }

  const filteredSuggestions = suggestions
    .filter((suggestion) => suggestion.toLowerCase().includes(value.toLowerCase()) && suggestion !== value)
    .slice(0, 5)

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      {/* Main Search Container */}
      <div
        className={`relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-xl dark:shadow-gray-900/30 border transition-all duration-300 ${
          isFocused 
            ? "border-blue-400 dark:border-blue-500 shadow-2xl dark:shadow-gray-900/40 ring-4 ring-blue-100 dark:ring-blue-900/30" 
            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
        }`}
      >
        {/* Search Input Section */}
        <div className="flex items-center gap-3 p-4">
          {/* Search Icon */}
          <div className={`transition-colors duration-300 ${
            isFocused ? "text-blue-500 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
          }`}>
            <Search className="h-5 w-5" />
          </div>

          {/* Input Field */}
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => {
              setIsFocused(true)
              setShowSuggestions(true)
            }}
            onBlur={() => {
              setIsFocused(false)
              setTimeout(() => setShowSuggestions(false), 200)
            }}
            placeholder={placeholder}
            className="flex-1 border-0 bg-transparent text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-0 focus:outline-none text-lg"
          />

          {/* Clear Button */}
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-8 w-8 p-0 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 border-l border-gray-200 dark:border-gray-700 pl-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onFilterClick}
              className="h-9 px-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-300"
            >
              <Filter className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Filter</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onSortClick}
              className="h-9 px-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl transition-all duration-300"
            >
              <SortAsc className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Sort</span>
            </Button>
          </div>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="border-t border-gray-100 dark:border-gray-700/50 p-3">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium uppercase tracking-wide">Saran Pencarian</div>
            <div className="flex flex-wrap gap-2">
              {filteredSuggestions.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 px-3 py-1 rounded-full text-sm"
                  onClick={() => {
                    onChange(suggestion)
                    setShowSuggestions(false)
                  }}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Stats */}
      {value && (
        <div className="mt-3 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm dark:shadow-gray-900/30">
            Mencari: <span className="font-medium text-gray-700 dark:text-gray-200">"{value}"</span>
          </span>
        </div>
      )}
    </div>
  )
}