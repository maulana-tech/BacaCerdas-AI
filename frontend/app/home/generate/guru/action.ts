'use server';

import ApiClient from '@/lib/api';
import { revalidatePath } from 'next/cache';

// Interface untuk data yang datang dari komponen
interface StoryPayload {
  title: string;
  content: string;
  tags: string[];
}

// Server action yang bisa membuat atau memperbarui cerita
export async function saveStoryAction(
  storyData: StoryPayload,
  authorId: string,
  storyId: string | null, // storyId bersifat opsional
) {
  const apiClient = new ApiClient();
  const api = await apiClient.withAuthServer();

  try {
    let response;

    if (storyId) {
      // --- LOGIKA UPDATE ---
      // Endpoint untuk update biasanya PATCH dan hanya mengirim data yang berubah
      const patchPayload = {
        data: {
          title: storyData.title,
          content: storyData.content,
        },
      };
      response = await api.patch(`/stories/${storyId}`, patchPayload);
      // Revalidasi halaman guru setelah mengedit
      revalidatePath(`/home/generate/guru?id=${storyId}`);
    } else {
      // --- LOGIKA CREATE ---
      // Menggunakan struktur payload yang sudah kita temukan sebelumnya
      const createPayload = {
        data: {
          title: storyData.title,
          content: storyData.content,
        },
        relationships: {
          user: { data: { id: authorId } },
          tag: { data: { id: storyData.tags[0] || 'General' } },
        },
      };
      response = await api.post('/stories', createPayload);
    }
    
    // Revalidasi halaman siswa agar cerita baru/update muncul
    revalidatePath('/home/generate/siswa');

    return response.data;

  } catch (error: any) {
    // Penanganan error yang detail tetap kita pertahankan
    const firstError = error.response?.data?.error?.details?.errors[0];
    const errorMessage = firstError?.message || 'Gagal menyimpan cerita.';
    console.error('Detail Error Simpan Cerita:', JSON.stringify(error.response?.data, null, 2));
    throw new Error(errorMessage);
  }
}