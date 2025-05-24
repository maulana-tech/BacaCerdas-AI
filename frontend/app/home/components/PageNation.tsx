"use client";

interface PagenationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export default function Pagenation({ currentPage, totalPages, goToPage }: PagenationProps) {
  if (totalPages <= 1) return null;

  // Tentukan rentang halaman yang akan ditampilkan
  const pagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  // Sesuaikan jika rentang halaman di awal atau akhir
  if (endPage - startPage + 1 < pagesToShow) {
    if (currentPage < totalPages / 2) {
      endPage = Math.min(totalPages, startPage + pagesToShow - 1);
    } else {
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }
  }
  
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }


  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Halaman sebelumnya"
        >
          &larr;
        </button>

        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            className={`px-4 py-2 rounded-md ${
              currentPage === pageNum
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            aria-current={currentPage === pageNum ? "page" : undefined}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Halaman berikutnya"
        >
          &rarr;
        </button>
      </nav>
    </div>
  );
}