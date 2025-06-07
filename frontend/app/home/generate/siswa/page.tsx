// Tidak ada "use client" di sini, ini adalah Server Component
import StoryList, { Story } from "../../../../components/story-list"; // Pastikan path ini benar
import { HomeAppLayout } from "../../components/home-app-layout";
import ApiClient from "@/lib/api"; // Diperlukan untuk fetch di server

// Definisikan interface untuk respons API
interface StoryApiResponse {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  author?: string;
  image?: string;
  publishDate?: string;
  views?: number | string;
  comments?: number;
  category?: string;
}

// Fungsi untuk mengambil dan memformat data cerita
async function getStoriesData(): Promise<Story[]> {
  const apiClient = new ApiClient();
  try {
    const response = await apiClient.instance.get("/stories");

    if (response.data && Array.isArray(response.data)) {
      // Gunakan type assertion dengan interface yang didefinisikan
      const formattedStories: Story[] = response.data.map(
        (item: StoryApiResponse) => ({
          id: item.id || `story-${Math.random().toString(36).substring(2, 9)}`,
          title: item.title || "Judul tidak tersedia",
          subtitle:
            item.subtitle || item.description || "Deskripsi tidak tersedia",
          author: item.author || "Penulis tidak diketahui",
          image: item.image || "/placeholder.svg?height=120&width=200",
          publishDate: item.publishDate
            ? new Date(item.publishDate).toLocaleDateString("id-ID", {
                month: "short",
                day: "numeric",
              })
            : new Date().toLocaleDateString("id-ID", {
                month: "short",
                day: "numeric",
              }),
          views:
            typeof item.views === "number"
              ? item.views.toString()
              : item.views || "0",
          comments: item.comments || 0,
          category: item.category || "Umum",
        })
      );
      return formattedStories;
    } else {
      console.warn("Format data API tidak sesuai dari server:", response.data);
      return []; // Kembalikan array kosong jika format tidak sesuai
    }
  } catch (error) {
    // Gunakan type narrowing untuk error
    if (error instanceof Error) {
      console.error("Gagal mengambil data cerita di server:", error.message);
    } else {
      console.error(
        "Gagal mengambil data cerita di server dengan error tidak dikenal"
      );
    }
    // Anda bisa melempar error di sini untuk ditangani oleh error.tsx
    // throw new Error("Gagal mengambil data cerita");
    return []; // Atau kembalikan array kosong agar halaman tetap render sebagian
  }
}

// Page component sekarang menjadi async
export default async function Page() {
  // Gunakan try-catch untuk menangani error pada level komponen
  try {
    const stories = await getStoriesData();

    // Contoh jika ingin memberikan fungsi summarize kustom dari page:
    // const handlePageSummarize = (storyId: string) => {
    //   "use server"; // Jika aksi ini juga server-side atau memanggil Server Action
    //   console.log(`Page-level summarize untuk cerita ${storyId} (server action)`);
    //   // Lakukan aksi lain
    // };

    return (
      <HomeAppLayout>
        <StoryList
          stories={stories} // Gunakan prop 'stories' yang sesuai dengan StoryListProps
          storiesPerPage={5}
          // onSummarizeProp={handlePageSummarize} // Opsional, jika ada handler kustom
        />
      </HomeAppLayout>
    );
  } catch (error) {
    // Tangani error pada level komponen
    console.error("Error rendering page:", error);
    return (
      <HomeAppLayout>
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Terjadi kesalahan saat memuat data
          </h2>
          <p className="mt-2">Silakan coba lagi nanti</p>
        </div>
      </HomeAppLayout>
    );
  }
}
