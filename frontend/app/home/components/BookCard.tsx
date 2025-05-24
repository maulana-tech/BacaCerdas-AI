"use client";

// Tipe data untuk buku
export interface BookItem {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
}

interface BookCardProps {
  book: BookItem;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden group cursor-pointer h-full">
      <div className="relative aspect-[3/4] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundImage: `url(${book.coverUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm">
          {book.author}
        </p>
      </div>
    </div>
  );
}