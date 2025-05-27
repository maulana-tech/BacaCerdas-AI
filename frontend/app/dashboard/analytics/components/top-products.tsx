import { CheckCircle2 } from "lucide-react";
import { BookOpen } from "lucide-react";
// Anda mungkin ingin menambahkan ikon lain jika diperlukan untuk variasi di masa depan
// import { Sparkles, Zap, TrendingUp } from "lucide-react";

// Mengganti topProducts dengan fitur-fitur yang relevan untuk BacaCerdas.AI
const topFeatures = [
  {
    name: "Generator Ringkasan Cerdas",
    metric: "5.000+ ringkasan dibuat", // Mengganti 'revenue' dengan metrik yang relevan
    growth: "+25% penggunaan",
    icon: CheckCircle2, // Tetap menggunakan CheckCircle2 sesuai struktur awal
  },
  {
    name: "Analisis Pemahaman Bacaan (AI)",
    metric: "Skor rata-rata 85%",
    growth: "+10% partisipasi tes",
    icon: CheckCircle2,
  },
  {
    name: "Rekomendasi Artikel Personalisasi",
    metric: "90% akurasi rekomendasi",
    growth: "+15% klik",
    icon: CheckCircle2,
  },
  {
    name: "Asisten Belajar Interaktif",
    metric: "10.000+ pertanyaan terjawab",
    growth: "+20% interaksi",
    icon: CheckCircle2,
  },
  {
    name: "Pustaka Digital Terkurasi",
    metric: "2.000+ konten tersedia",
    growth: "+18% penambahan konten",
    icon: CheckCircle2,
  },
];

const topCourses = [
  { name: "Strategi Membaca Efektif dengan AI", students: "1,200 siswa", growth: "+12%", icon: BookOpen },
  { name: "Pemahaman Konten Kompleks", students: "980 siswa", growth: "+8%", icon: BookOpen },
  { name: "Berpikir Kritis Melalui Teks", students: "850 siswa", growth: "+15%", icon: BookOpen },
  { name: "Teknik Speed Reading & Retensi", students: "750 siswa", growth: "+5%", icon: BookOpen },
  { name: "Analisis Naratif dan Struktur Teks", students: "680 siswa", growth: "+20%", icon: BookOpen },
];

// Mengganti nama komponen agar lebih deskriptif, misal TopHighlights atau FeaturedContent
export function KontenUnggulanBacaCerdas() {
  return (
    <div className="space-y-8">
      {/* Bagian untuk Kursus Populer */}
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-800 dark:text-gray-200">
          Kursus Terpopuler
        </h3>
        <div className="space-y-4">
          {topCourses.map((course) => (
            <div key={course.name} className="flex items-center rounded-md border p-3 shadow-sm dark:border-gray-700">
              <course.icon className="mr-3 h-5 w-5 text-purple-600 dark:text-purple-500" /> {/* Memberi warna pada ikon */}
              <div className="flex-grow space-y-1">
                <p className="text-sm font-semibold leading-none text-gray-900 dark:text-white">{course.name}</p>
                <p className="text-xs text-muted-foreground dark:text-gray-400">{course.students}</p>
              </div>
              <div className="ml-auto text-sm font-medium text-green-600 dark:text-green-400">{course.growth}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}