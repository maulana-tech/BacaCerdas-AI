"use client";

import ContentCard, { ContentItem } from "./contentCard";

interface RecentContentSectionProps {
  recentContent: ContentItem[];
  onContentClick?: (content: ContentItem) => void; // Fungsi callback saat konten diklik
}

export default function RecentContentSection({ 
  recentContent, 
  onContentClick 
}: RecentContentSectionProps) {
  if (!recentContent || recentContent.length === 0) {
    return (
        <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Terakhir Dilihat</h2>
            <p className="text-muted-foreground">Belum ada konten yang dilihat.</p>
        </section>
    );
  }

  // Hanya tampilkan maksimal 4 konten terbaru
  const displayedContent = recentContent.slice(0, 4);

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6">Terakhir Dilihat</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedContent.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onContentClick && onContentClick(item)}
            className="cursor-pointer"
          >
            <ContentCard content={item} />
          </div>
        ))}
      </div>
    </section>
  );
}