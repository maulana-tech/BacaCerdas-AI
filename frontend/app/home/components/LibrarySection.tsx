"use client";

import BookCard, { type BookItem } from "./BookCard";
import Pagination from "./PageNation";

interface LibrarySectionProps {
  currentBooks: BookItem[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export default function LibrarySection({ currentBooks, currentPage, totalPages, goToPage }: LibrarySectionProps) {
  return (
    <section id="library-section" className="mb-10">
      <h2 className="text-xl font-semibold mb-6">Library</h2>
      {currentBooks && currentBooks.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {currentBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        </>
      ) : (
        <p className="text-muted-foreground">Tidak ada buku di library saat ini.</p>
      )}
    </section>
  );
}