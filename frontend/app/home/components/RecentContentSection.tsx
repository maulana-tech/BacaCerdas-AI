"use client";

import ContentCard, { ContentItem } from "./contentCard";



interface RecentContentSectionProps {
  recentContent: ContentItem[];
}

export default function RecentContentSection({ recentContent }: RecentContentSectionProps) {
  if (!recentContent || recentContent.length === 0) {
    return (
        <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Terakhir Dilihat</h2>
            <p className="text-gray-600">Belum ada konten yang dilihat.</p>
        </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Terakhir Dilihat</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentContent.map((item) => (
          <ContentCard key={item.id} content={item} />
        ))}
      </div>
    </section>
  );
}