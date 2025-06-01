"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, Share2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Data dummy untuk detail cerita
const storyDetails = {
  "story-1": {
    title: "Surat untuk Masa Depan",
    author: "Ahmad Rizki",
    image: "/placeholder.svg?height=300&width=400",
    content: `Hari ini aku menulis surat untuk diriku yang 10 tahun mendatang. Entah mengapa, tiba-tiba saja aku merasa perlu melakukan ini.

"Hai, Ahmad yang sudah berusia 35 tahun," begitu aku memulai surat ini. "Aku harap kamu masih ingat dengan hari ini, 15 Maret 2024, ketika kamu masih berusia 25 tahun dan baru saja lulus kuliah."

Aku menceritakan tentang mimpi-mimpiku saat ini. Tentang bagaimana aku ingin menjadi penulis yang bisa menginspirasi banyak orang. Tentang keinginanku untuk berkeliling dunia dan menulis cerita dari berbagai negara.

"Aku harap 10 tahun dari sekarang, kamu sudah menerbitkan setidaknya 3 novel," tulisku dengan penuh harap. "Dan aku harap kamu masih memiliki mata yang berbinar ketika melihat sunset, seperti yang kulakukan sekarang."

Surat itu aku simpan dalam amplop cokelat tua, dan aku berjanji akan membukanya tepat 10 tahun dari sekarang. Siapa tahu, mungkin Ahmad yang 35 tahun nanti akan tersenyum membaca surat dari dirinya yang masih muda dan penuh mimpi ini.`,
    readTime: "8 menit",
    likes: 156,
    category: "Drama",
    publishDate: "15 Maret 2024",
  },
  "story-2": {
    title: "Kopi dan Kenangan",
    author: "Siti Nurhaliza",
    image: "/placeholder.svg?height=300&width=400",
    content: `Kedai kopi "Nostalgia" sudah berdiri di sudut jalan itu selama 30 tahun. Pak Hasan, pemiliknya, selalu bercerita bahwa setiap cangkir kopi yang disajikan di sini membawa cerita tersendiri.

"Lihat meja di pojok itu," kata Pak Hasan sambil menunjuk ke arah jendela. "Di situ, sepasang kekasih pernah putus setelah berpacaran 5 tahun. Tapi anehnya, mereka kembali ke sini setahun kemudian untuk menikah."

Aku tersenyum mendengar cerita itu sambil menyeruput kopi hitam yang masih mengepul. Aromanya begitu khas, perpaduan antara biji kopi pilihan dan kehangatan yang tak bisa dijelaskan dengan kata-kata.

"Dan meja tempat kamu duduk sekarang," lanjut Pak Hasan, "adalah tempat favorit seorang penulis tua yang selalu datang setiap pagi. Dia sudah meninggal 2 tahun lalu, tapi kadang aku masih menyiapkan secangkir kopi untuknya."

Kedai ini memang istimewa. Bukan hanya karena kopinya yang nikmat, tapi karena setiap sudutnya menyimpan kenangan indah dari para pengunjung yang pernah singgah.`,
    readTime: "6 menit",
    likes: 89,
    category: "Romance",
    publishDate: "12 Maret 2024",
  },
  "story-3": {
    title: "Jejak di Pasir Pantai",
    author: "Budi Santoso",
    image: "/placeholder.svg?height=300&width=400",
    content: `Pak Joko sudah menjadi nelayan selama 40 tahun. Setiap pagi, sebelum matahari terbit, dia sudah berada di pantai, mempersiapkan perahunya untuk melaut.

Hari itu berbeda. Ketika dia berjalan di sepanjang pantai, dia melihat jejak kaki kecil di pasir. Jejak itu mengingatkannya pada cucunya yang sudah lama tidak berkunjung.

"Hidup ini seperti jejak di pasir pantai," gumamnya sambil menatap ombak yang datang dan pergi. "Kadang terlihat jelas, kadang terhapus oleh air laut."

Dia teringat pada istrinya yang sudah meninggal 5 tahun lalu. Perempuan itu selalu berpesan agar Pak Joko tidak terlalu larut dalam kesedihan. "Hidup harus terus berjalan, seperti ombak yang tak pernah berhenti," kata istrinya dulu.

Pagi itu, Pak Joko memutuskan untuk tidak melaut. Dia duduk di tepi pantai, menatap matahari terbit sambil berdoa. Dia bersyukur atas semua yang telah diberikan Tuhan kepadanya.

Jejak di pasir mungkin akan terhapus, tapi kenangan indah akan selalu tersimpan di hati.`,
    readTime: "12 menit",
    likes: 203,
    category: "Spiritual",
    publishDate: "10 Maret 2024",
  },
}

export default function StoryPage({ params }: { params: { id: string } }) {
  const story = storyDetails[params.id as keyof typeof storyDetails]

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Cerita tidak ditemukan</h1>
          <Link href="/">
            <Button>Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-800 flex-1 text-center px-4 truncate">{story.title}</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            {/* Story Header */}
            <div className="mb-6">
              <Image
                src={story.image || "/placeholder.svg"}
                alt={story.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h1 className="text-2xl font-bold text-gray-800 mb-2">{story.title}</h1>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>oleh {story.author}</span>
                <span>•</span>
                <span>{story.publishDate}</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{story.readTime}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Heart className="h-4 w-4" />
                  <span>{story.likes} suka</span>
                </div>
                <Badge variant="secondary">{story.category}</Badge>
              </div>
            </div>

            {/* Story Content */}
            <div className="prose prose-gray max-w-none">
              {story.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t">
              <Button className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Suka ({story.likes})
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
