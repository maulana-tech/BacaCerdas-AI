"use client";

// Tipe data untuk konten
export interface ContentItem {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

interface ContentCardProps {
  content: ContentItem;
}

export default function ContentCard({ content }: ContentCardProps) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden group cursor-pointer h-full">
      <div className="relative h-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundImage: `url(${content.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="inline-block bg-blue-600/80 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
            {content.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {content.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {content.description}
        </p>
      </div>
    </div>
  );
}