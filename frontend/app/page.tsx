import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-zinc-950 z-0"></div>
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10 z-0"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
                Membaca Lebih Cerdas dengan <span className="text-blue-500">AI</span>
              </h1>
              <p className="text-lg text-zinc-300 max-w-xl">
                Platform membaca berbasis AI yang membantu Anda memahami, menganalisis, dan mempelajari konten dengan lebih efektif dan mendalam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/sign-up">
                  <Button size="lg" className="w-full sm:w-auto">
                    Mulai Gratis
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-black hover:text-gray">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/hero-image.svg"
                width={600}
                height={500}
                alt="BacaCerdas-AI Platform"
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Fitur Unggulan</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Tingkatkan pengalaman membaca Anda dengan teknologi AI canggih
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Ringkasan Cerdas",
                description: "Dapatkan ringkasan otomatis dari teks panjang dengan poin-poin utama yang mudah dipahami.",
                icon: "📝"
              },
              {
                title: "Analisis Mendalam",
                description: "Analisis konten secara mendalam untuk memahami konteks, argumen, dan struktur teks.",
                icon: "🔍"
              },
              {
                title: "Pembelajaran Adaptif",
                description: "Sistem yang menyesuaikan dengan gaya belajar dan tingkat pemahaman Anda.",
                icon: "🧠"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700 hover:border-blue-500/50 transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Apa Kata Pengguna Kami</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pengguna yang telah meningkatkan kemampuan membaca mereka
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Budi Santoso",
                role: "Mahasiswa",
                quote: "BacaCerdas-AI membantu saya memahami materi kuliah yang kompleks dengan lebih mudah."
              },
              {
                name: "Siti Rahayu",
                role: "Peneliti",
                quote: "Saya menggunakan platform ini untuk menganalisis paper penelitian dan hasilnya sangat memuaskan."
              },
              {
                name: "Ahmad Hidayat",
                role: "Profesional",
                quote: "Fitur ringkasan menghemat banyak waktu saya dalam membaca laporan panjang."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-zinc-900/80 p-6 rounded-xl border border-zinc-800">
                <p className="text-zinc-300 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-zinc-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap untuk Meningkatkan Pengalaman Membaca Anda?
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Bergabunglah dengan BacaCerdas-AI dan mulai perjalanan membaca cerdas Anda hari ini.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="px-8">
              Mulai Sekarang
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
