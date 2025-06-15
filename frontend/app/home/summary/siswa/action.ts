"use server"

import ApiClient from "@/lib/api"
import { revalidatePath } from "next/cache"
import type { Summary } from "@/lib/types"

export async function getStudentSummaries(): Promise<Summary[]> {
  const apiClient = new ApiClient()
  const api = await apiClient.withAuthServer()

  try {
    const response = await api.get("/summaries")
    return response.data.data || []
  } catch (error: any) {
    // Mengadopsi penanganan error yang lebih baik
    console.error(
      "Gagal mengambil summaries:",
      JSON.stringify(error.response?.data, null, 2),
    )
    throw new Error("Gagal mengambil daftar rangkuman.")
  }
}

/**
 * Mengambil satu rangkuman berdasarkan ID.
 * Sudah menggunakan ApiClient untuk konsistensi.
 * @param id - ID dari rangkuman yang akan diambil.
 */
export async function getSummaryById(id: string): Promise<Summary | null> {
  const apiClient = new ApiClient()
  const api = await apiClient.withAuthServer()

  try {
    const response = await api.get(`/summaries/${id}`)
    return response.data.data
  } catch (error: any) {
    // Jika tidak ditemukan (error 404), akan mengembalikan null secara alami
    console.error(
      `Gagal mengambil summary ${id}:`,
      JSON.stringify(error.response?.data, null, 2),
    )
    return null
  }
}

// --- FUNGSI SAVE BARU (SEPERTI PADA CONTOH) ---

// Interface untuk payload dari komponen UI
interface SummaryPayload {
  title: string
  content: string
  source_document?: string // Opsional, jika ada
}

/**
 * Server action untuk membuat atau memperbarui rangkuman.
 * Mengikuti pola dari `saveStoryAction`.
 * @param summaryData - Data rangkuman (judul, konten).
 * @param authorId - ID pengguna yang membuat rangkuman.
 * @param summaryId - ID rangkuman jika sedang mengedit (opsional).
 */
export async function saveSummaryAction(
  summaryData: SummaryPayload,
  authorId: string,
  summaryId: string | null,
) {
  const apiClient = new ApiClient()
  const api = await apiClient.withAuthServer()

  try {
    let response

    if (summaryId) {
      // --- LOGIKA UPDATE ---
      const patchPayload = {
        data: {
          title: summaryData.title,
          content: summaryData.content,
        },
      }
      response = await api.patch(`/summaries/${summaryId}`, patchPayload)
      // Revalidasi halaman detail agar data baru muncul
      revalidatePath(`/home/summary/siswa/${summaryId}`)
    } else {
      // --- LOGIKA CREATE ---
      const createPayload = {
        data: {
          title: summaryData.title,
          content: summaryData.content,
          source_document: summaryData.source_document || null,
        },
        relationships: {
          user: { data: { id: authorId } },
        },
      }
      response = await api.post("/summaries", createPayload)
    }

    // Revalidasi halaman daftar agar rangkuman baru/update muncul
    revalidatePath("/home/summary/siswa")

    return response.data
  } catch (error: any) {
    // Penanganan error yang detail dan informatif
    const firstError = error.response?.data?.error?.details?.errors[0]
    const errorMessage = firstError?.message || "Gagal menyimpan rangkuman."
    console.error(
      "Detail Error Simpan Rangkuman:",
      JSON.stringify(error.response?.data, null, 2),
    )
    throw new Error(errorMessage)
  }
}