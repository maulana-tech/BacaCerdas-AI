"use client";

import { FileText } from "lucide-react";
import { RecentStoryCard } from "@/app/home/generate/siswa/component/recent-story-card";
import type { StoryApiResponse } from "@/app/home/generate/siswa/action";

interface StoryFileRowProps {
  stories: StoryApiResponse[];
}

export function StoryFileRow({ stories }: StoryFileRowProps) {
  // Hanya tampilkan 4 cerita terbaru
  const recentStories = stories.slice(0, 4);
  
  return (
    <div className="grid grid-cols-1 divide-y">
      {recentStories.map((story) => (
        <RecentStoryCard key={story.attributes.id} story={story} />
      ))}
      {recentStories.length === 0 && (
        <p className="p-4 text-muted-foreground">Tidak ada cerita terbaru.</p>
      )}
    </div>
  );
}