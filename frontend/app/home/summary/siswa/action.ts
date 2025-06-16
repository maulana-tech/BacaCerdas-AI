"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import type { SummarizedCourse, Course } from "@/lib/types"

// Ambil URL API dari environment variables, dengan fallback untuk development
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

/**
 * Mendapatkan token autentikasi dari sesi pengguna.
 * Ini diperlukan untuk setiap panggilan API yang aman.
 */
async function getAuthToken() {
  const session = await auth();
  // PERBAIKAN: Mencari token di session.user.token sesuai dengan auth.ts Anda
  if (!session?.user?.token) {
    throw new Error("Pengguna tidak terautentikasi atau token tidak ditemukan.");
  }
  return session.user.token;
}

/**
 * Mengambil daftar rangkuman milik siswa dari backend API.
 */
export async function getStudentSummaries(): Promise<SummarizedCourse[]> {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/summaries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store', // Mencegah caching agar data selalu terbaru
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil daftar rangkuman.");
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error di getStudentSummaries:", error);
    // Fallback ke data dummy akan ditangani oleh komponen pemanggil
    throw error;
  }
}

/**
 * Mengambil daftar semua mata pelajaran dari backend API.
 * CATATAN: Endpoint ini belum ada di backend Anda.
 */
export async function getCourses(): Promise<Course[]> {
  // Fungsi ini sengaja dibuat gagal karena endpoint `/courses` belum ada di backend.
  // Ini akan membuat komponen fallback ke data dummy, sesuai desain.
  console.log("Mencoba mengambil data mata pelajaran, akan gagal karena endpoint tidak ada.");
  throw new Error("Endpoint untuk 'getCourses' belum diimplementasikan di backend.");
}

/**
 * Menyimpan rangkuman (baru atau yang diedit) ke backend API.
 */
export async function saveSummaryAction(
  payload: { summary: string; courseId: string },
  summaryId: string | null
): Promise<SummarizedCourse> {
  const token = await getAuthToken();

  const url = summaryId ? `${API_URL}/summaries/${summaryId}` : `${API_URL}/summaries`;
  const method = summaryId ? "PUT" : "POST";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Gagal menyimpan rangkuman.");
  }

  revalidatePath("/home/summary/siswa");

  const result = await response.json();
  return result.data;
}

/**
 * Mengambil satu rangkuman berdasarkan ID-nya.
 */
export async function getSummaryById(id: string): Promise<SummarizedCourse | null> {
    try {
        const token = await getAuthToken();
        const response = await fetch(`${API_URL}/summaries/${id}`, {
             headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            if(response.status === 404) return null;
            throw new Error("Gagal mengambil detail rangkuman.");
        }
        
        const result = await response.json();
        return result.data;
    } catch(error) {
        console.error("Error di getSummaryById:", error);
        throw error;
    }
}