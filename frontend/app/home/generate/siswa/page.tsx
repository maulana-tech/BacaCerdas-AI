"use client";
import StoryList, { Story } from "./components/ui/story-list";

// Data dummy untuk cerita pendek (diperbanyak untuk demonstrasi pagination)
const allStories: Story[] = [
  {
    id: "story-1",
    title: "Surat untuk Masa Depan—Kisah Pemuda yang Menulis Harapan",
    subtitle:
      "Seorang pemuda menulis surat untuk dirinya 10 tahun mendatang, berisi mimpi dan harapan yang mungkin akan mengubah hidupnya.",
    author: "Ahmad Rizki",
    image: "/placeholder.svg?height=120&width=200",
    publishDate: "Mar 15",
    views: "1.2K",
    comments: 45,
    category: "Drama",
  },
  {
    id: "story-2",
    title: "Kopi dan Kenangan—Kedai Tua yang Menyimpan Ribuan Cerita",
    subtitle:
      "Di sebuah kedai kopi tua, tersimpan ribuan cerita dari para pengunjung yang datang dan pergi selama 30 tahun.",
    author: "Siti Nurhaliza",
    image: "/placeholder.svg?height=120&width=200",
    publishDate: "Mar 12",
    views: "890",
    comments: 23,
    category: "Romance",
  },
  {
    id: "story-3",
    title: "Jejak di Pasir Pantai—Perjalanan Spiritual Nelayan Tua",
    subtitle:
      "Perjalanan spiritual seorang nelayan tua yang menemukan makna hidup melalui jejak-jejak di pasir pantai.",
    author: "Budi Santoso",
    image: "/placeholder.svg?height=120&width=200",
    publishDate: "Mar 10",
    views: "2.1K",
    comments: 67,
    category: "Spiritual",
  },
  {
    id: "story-4",
    title: "Lampu Jalan yang Bercerita—Saksi Bisu Kehidupan Kota",
    subtitle:
      "Sebuah lampu jalan tua menjadi saksi bisu berbagai kisah kehidupan yang terjadi di bawah sinarnya.",
    author: "Rina Melati",
    image: "/placeholder.svg?height=120&width=200",
    publishDate: "Mar 8",
    views: "756",
    comments: 34,
    category: "Urban",
  },
  {
    id: "story-5",
    title: "Buku Harian Kucing—Petualangan Seekor Kucing Jalanan",
    subtitle:
      "Kisah petualangan seekor kucing jalanan yang diceritakan melalui buku harian imajinatif.",
    author: "Doni Pratama",
    image: "/placeholder.svg?height=120&width=200",
    publishDate: "Mar 5",
    views: "1.5K",
    comments: 89,
    category: "Fantasy",
  },
  {
    id: "story-6",
    title: "Hujan Pertama—Kenangan Masa Kecil yang Terlupakan",
    subtitle:
      "Cerita tentang kenangan masa kecil yang tiba-tiba muncul saat hujan pertama di musim penghujan.",
    author: "Maya Sari",
    image: "/placeholder.svg?height=120&width=200",
    publishDate: "Mar 3",
    views: "934",
    comments: 56,
    category: "Drama",
  },
  {
    id: "story-7",
    title: "Toko Buku Bekas—Tempat Bertemunya Jiwa-Jiwa Pencari Ilmu",
    subtitle:
      "Di sebuah toko buku bekas, berbagai karakter unik bertemu dan berbagi cerita hidup mereka.",
    author: "Indra Wijaya",
    image: "/placeholder.svg?height=120&width=200",
    publishDate: "Mar 1",
    views: "1.8K",
    comments: 72,
    category: "Slice of Life",
  },
  {
    id: "story-8",
    title: "Sepeda Tua Ayah—Warisan yang Tak Ternilai Harganya",
    subtitle:
      "Sebuah sepeda tua menjadi jembatan kenangan antara seorang anak dan ayahnya yang telah tiada.",
    author: "Fajar Nugroho",
    image: "/placeholder.svg?height=120&width=200",
    publishDate: "Feb 28",
    views: "2.3K",
    comments: 98,
    category: "Family",
  },
  {
    id: "story-9",
    title: "Stasiun Tengah Malam—Pertemuan Tak Terduga di Kereta Terakhir",
    subtitle:
      "Dua orang asing bertemu di kereta terakhir dan berbagi cerita yang mengubah hidup mereka.",
    author: "Lisa Permata",
    image: "/placeholder.svg?height=120&width=200",
    publishDate: "Feb 25",
    views: "1.1K",
    comments: 41,
    category: "Romance",
  },
  {
    id: "story-10",
    title: "Pohon Mangga di Halaman—Saksi Bisu Tumbuh Kembang Keluarga",
    subtitle:
      "Sebuah pohon mangga tua menjadi saksi perjalanan hidup tiga generasi dalam satu keluarga.",
    author: "Bambang Sutrisno",
    image: "/placeholder.svg?height=120&width=200",
    publishDate: "Feb 22",
    views: "1.7K",
    comments: 63,
    category: "Family",
  },
  {
    id: "story-11",
    title: "Warung Makan Ibu Sari—Tempat Berkumpulnya Cerita Rakyat",
    subtitle:
      "Di warung makan sederhana, Ibu Sari mendengar dan menyimpan berbagai cerita dari para pelanggannya.",
    author: "Dewi Lestari",
    image: "/placeholder.svg?height=120&width=200",
    publishDate: "Feb 20",
    views: "845",
    comments: 29,
    category: "Slice of Life",
  },
  {
    id: "story-12",
    title: "Surat Cinta yang Tertukar—Kesalahan yang Membawa Kebahagiaan",
    subtitle:
      "Sebuah surat cinta yang tertukar alamat justru membawa dua hati yang berbeda untuk bersatu.",
    author: "Rudi Hermawan",
    image: "/placeholder.svg?height=120&width=200",
    publishDate: "Feb 18",
    views: "2.5K",
    comments: 112,
    category: "Romance",
  },
];

// Search suggestions
const searchSuggestions = [
  "Drama",
  "Romance",
  "Spiritual",
  "Urban",
  "Fantasy",
  "Family",
  "Slice of Life",
  "Ahmad Rizki",
  "Siti Nurhaliza",
  "Budi Santoso",
  "Rina Melati",
  "Surat",
  "Kopi",
  "Pantai",
  "Lampu",
  "Kucing",
  "Hujan",
  "Toko Buku",
];

const Page = () => {
  const handleSummarize = (storyId: string) => {
    alert(`Merangkum cerita ${storyId}...`);
  };

  return (
    <StoryList
      stories={allStories}
      storiesPerPage={5}
      searchSuggestions={searchSuggestions}
      onSummarize={handleSummarize}
    />
  );
};

export default Page;
