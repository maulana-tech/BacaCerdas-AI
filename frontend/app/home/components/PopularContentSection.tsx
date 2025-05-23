"use client";

import ContentCard, { type ContentItem } from "./contentCard";



interface PopularContentSectionProps {
  popularContent: ContentItem[];
}

export default function PopularContentSection({ popularContent }: PopularContentSectionProps) {
  if (!popularContent || popularContent.length === 0) {
     return (
        <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Populer</h2>
            <p className="text-gray-600">Belum ada konten populer saat ini.</p>
        </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Populer</h2>
      <div className="relative">
        <div className="flex overflow-x-auto snap-x scrollbar-hide pb-4 -mx-4 px-4">
          <div className="flex space-x-6">
            {popularContent.map((item) => (
              <div key={item.id} className="snap-start flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs">
                <ContentCard content={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}