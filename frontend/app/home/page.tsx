"use client";

import { useState, useEffect } from "react";
import HomeHeader from "./components/HomeHeader";
import RecentContentSection from "./components/RecentContentSection";
import PopularContentSection from "./components/PopularContentSection";
import LibrarySection from "./components/LibrarySection";
import LoadingSpinner from "./components/LoadingSpinner";
import type { BookItem } from "./components/BookCard";      // Impor tipe
import { ContentItem } from "./components/contentCard";


export default function Home() {
  const [recentContent, setRecentContent] = useState<ContentItem[]>([]);
  const [popularContent, setPopularContent] = useState<ContentItem[]>([]);
  const [books, setBooks] = useState<BookItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("Pengguna");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    setUserName("Andi");

    setRecentContent([
      {
        id: 1,
        title: "Petualangan di Hutan Ajaib",
        category: "Cerita",
        description: "Kisah seorang anak yang menemukan dunia ajaib tersembunyi di dalam hutan dekat rumahnya.",
        imageUrl: "https://source.unsplash.com/random/300x200?forest,adventure"
      },
      {
        id: 2,
        title: "Rahasia Matematika Dasar",
        category: "Pendidikan",
        description: "Panduan lengkap untuk memahami konsep dasar matematika dengan cara yang menyenangkan.",
        imageUrl: "https://source.unsplash.com/random/300x200?math,education"
      },
      {
        id: 3,
        title: "Sejarah Indonesia Kuno",
        category: "Sejarah",
        description: "Menelusuri jejak peradaban kuno di Nusantara dari masa prasejarah hingga kerajaan-kerajaan besar.",
        imageUrl: "https://source.unsplash.com/random/300x200?history,ancient"
      },
      {
        id: 4,
        title: "Sains untuk Anak",
        category: "Pendidikan",
        description: "Eksperimen sains sederhana yang bisa dilakukan di rumah untuk menumbuhkan minat anak pada ilmu pengetahuan.",
        imageUrl: "https://source.unsplash.com/random/300x200?science,kids"
      }
      ,{
        id: 5,
        title: "Petualangan di Hutan Ajaib",
        category: "Cerita",
        description: "Kisah seorang anak yang menemukan dunia ajaib tersembunyi di dalam hutan dekat rumahnya.",
        imageUrl: "https://source.unsplash.com/random/300x200?forest,adventure"
      },
      {
        id: 6,
        title: "Rahasia Matematika Dasar",
        category: "Pendidikan",
        description: "Panduan lengkap untuk memahami konsep dasar matematika dengan cara yang menyenangkan.",
        imageUrl: "https://source.unsplash.com/random/300x200?math,education"
      },
      {
        id: 7,
        title: "Sejarah Indonesia Kuno",
        category: "Sejarah",
        description: "Menelusuri jejak peradaban kuno di Nusantara dari masa prasejarah hingga kerajaan-kerajaan besar.",
        imageUrl: "https://source.unsplash.com/random/300x200?history,ancient"
      },
      {
        id: 8,
        title: "Sains untuk Anak",
        category: "Pendidikan",
        description: "Eksperimen sains sederhana yang bisa dilakukan di rumah untuk menumbuhkan minat anak pada ilmu pengetahuan.",
        imageUrl: "https://source.unsplash.com/random/300x200?science,kids"
      }
    ]);
    
    setPopularContent([
      {
        id: 5,
        title: "Misteri Pulau Tersembunyi",
        category: "Petualangan",
        description: "Kisah sekelompok penjelajah yang terdampar di pulau misterius dengan rahasia kuno.",
        imageUrl: "https://source.unsplash.com/random/300x200?island,mystery"
      },
      {
        id: 6,
        title: "Belajar Bahasa Inggris Cepat",
        category: "Pendidikan",
        description: "Metode cepat dan efektif untuk menguasai bahasa Inggris dalam 30 hari.",
        imageUrl: "https://source.unsplash.com/random/300x200?english,language"
      },
      {
        id: 7,
        title: "Dongeng Klasik Sebelum Tidur",
        category: "Cerita",
        description: "Kumpulan dongeng pendek yang sempurna untuk dibacakan sebelum tidur.",
        imageUrl: "https://source.unsplash.com/random/300x200?bedtime,story"
      },
      {
        id: 8,
        title: "Ensiklopedia Dinosaurus",
        category: "Pengetahuan",
        description: "Mengenal berbagai jenis dinosaurus dan kehidupan mereka jutaan tahun yang lalu.",
        imageUrl: "https://source.unsplash.com/random/300x200?dinosaur,knowledge"
      },
      {
        id: 9,
        title: "Petualangan Antariksa Nebula",
        category: "Fiksi Ilmiah",
        description: "Kisah perjalanan antariksa yang penuh dengan keajaiban dan tantangan di galaksi jauh.",
        imageUrl: "https://source.unsplash.com/random/300x200?space,galaxy"
      },
      {
        id: 10,
        title: "Biografi Pahlawan Bangsa",
        category: "Sejarah",
        description: "Mengenal perjuangan dan pengorbanan para pahlawan nasional Indonesia.",
        imageUrl: "https://source.unsplash.com/random/300x200?hero,biography"
      }
    ]);

    const dummyBooks: BookItem[] = [];
    const bookCategories = ["Petualangan Seru", "Misteri Tak Terpecahkan", "Pengetahuan Umum", "Sejarah Dunia", "Fiksi Fantasi", "Sains Populer"];
    const authors = ["Penulis Kreatif", "Pengarang Handal", "Pakar Sejarah", "Novelis Imajinatif", "Ilmuwan Terkenal"];
    
    for (let i = 1; i <= 20; i++) {
      dummyBooks.push({
        id: i,
        title: `Buku ${i}: ${bookCategories[i % bookCategories.length]} Vol. ${Math.floor(i/bookCategories.length) + 1}`,
        author: authors[i % authors.length],
        coverUrl: `https://source.unsplash.com/random/300x400?book,cover${i}` // Menambahkan variasi pada query gambar
      });
    }
    setBooks(dummyBooks);

    return () => clearTimeout(timer); // Membersihkan timer
  }, []);

  const totalPages = Math.ceil(books.length / booksPerPage);
  const currentBooks = books.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const librarySection = document.getElementById("library-section");
      if (librarySection) {
        librarySection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <HomeHeader userName={userName} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <RecentContentSection recentContent={recentContent} />
            <PopularContentSection popularContent={popularContent} />
            <LibrarySection
              currentBooks={currentBooks}
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />
          </>
        )}
      </main>
    </div>
  );
}