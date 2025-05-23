import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100/10 dark:from-background/10 to-white dark:to-foreground/10 z-0" />
        <div className="absolute inset-0 bg-[url('/images/hero-pattern-light.webp')] dark:bg-[url('/images/hero-pattern-dark.webp')] bg-cover bg-no-repeat opacity-40 z-0" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                Membaca Lebih Cerdas dengan <span className="text-blue-500 hover:text-blue-600 transition-colors">AI</span>
              </h1>
              <p className="text-lg text-foreground max-w-xl">
                Platform membaca berbasis AI yang membantu Anda memahami, menganalisis, dan mempelajari konten dengan lebih efektif dan mendalam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/auth/login">
                  <Button size="lg" className="w-full sm:w-auto transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                    Mulai Gratis
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-foreground border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400 transition-all  duration-300 hover:scale-105">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block transform transition-transform duration-500 hover:scale-105">
              {/* <Image
                src="/hero-image.svg"
                width={600}
                height={500}
                alt="BacaCerdas-AI Platform"
                className="w-full h-auto drop-shadow-xl"
                priority
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-blue-50 dark:bg-stone-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Fitur Unggulan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
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
              <div
                key={index}
                className="bg-card p-6 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Apa Kata Pengguna Kami</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pengguna yang telah meningkatkan kemampuan membaca mereka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Catur Setyono",
                role: "Mahasiswa",
                quote: "BacaCerdas-AI membantu saya memahami materi kuliah yang kompleks dengan lebih mudah."
              },
              {
                name: "Muh Maulana F",
                role: "Peneliti",
                quote: "Saya menggunakan platform ini untuk menganalisis paper penelitian dan hasilnya sangat memuaskan."
              },
              {
                name: "Fawaz",
                role: "Profesional",
                quote: "Fitur ringkasan menghemat banyak waktu saya dalam membaca laporan panjang."
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl transition-transform duration-300 shadow-sm hover:shadow-md transform hover:translate-y-[-5px]"
              >
                <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 dark:from-stone-900 to-purple-50 dark:to-stone-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Siap untuk Meningkatkan Pengalaman Membaca Anda?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Bergabunglah dengan BacaCerdas-AI dan mulai perjalanan membaca cerdas Anda hari ini.
          </p>
          <Link href="/auth/login">
            <Button
              size="lg"
              className="px-8 py-6 transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-lg text-lg"
            >
              Mulai Sekarang
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
