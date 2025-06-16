"use server"

import ApiClient from "@/lib/api"
import { revalidatePath } from "next/cache"
import type { SummarizedCourse, Course } from "@/lib/types"


export async function getCourses(): Promise<Course[]> {
  const apiClient = new ApiClient()
  const api = await apiClient.withAuthServer()
  try {
    const response = await api.get("/courses")
    return response.data.data || []
  } catch (error) {
    console.error("Gagal mengambil daftar courses:", error)
    return []
  }
}

export async function getStudentSummaries(): Promise<SummarizedCourse[]> {
  const apiClient = new ApiClient()
  const api = await apiClient.withAuthServer()
  try {
    const response = await api.get("/summaries")
    return response.data.data || []
  } catch (error: any) {
    console.error("Gagal mengambil summaries:", JSON.stringify(error.response?.data, null, 2))
    throw new Error("Gagal mengambil daftar rangkuman.")
  }
}

export async function getSummaryById(id: string): Promise<SummarizedCourse | null> {
  const apiClient = new ApiClient()
  const api = await apiClient.withAuthServer()
  try {
    const response = await api.get(`/summaries/${id}`)
    return response.data.data
  } catch (error) {
    return null
  }
}


interface SummaryPayload {
  summary: string
  courseId: string
}

export async function saveSummaryAction(
  summaryData: SummaryPayload,
  summaryId: string | null,
) {
  const apiClient = new ApiClient()
  const api = await apiClient.withAuthServer()

  try {
    let response
    if (summaryId) {
      // Logic UPDATE: hanya bisa update konten rangkuman
      const patchPayload = { data: { summary: summaryData.summary } }
      response = await api.patch(`/summaries/${summaryId}`, patchPayload)
    } else {
      // Logic CREATE: butuh courseId dan konten summary
      const createPayload = {
        data: {
          summary: summaryData.summary,
          courseId: summaryData.courseId,
        },
      }
      response = await api.post("/summaries", createPayload)
    }

    revalidatePath("/home/summary/siswa")
    return response.data
  } catch (error: any) {
    const errorMessage = error.response?.data?.error?.details?.errors[0]?.message || "Gagal menyimpan rangkuman."
    console.error("Detail Error Simpan Rangkuman:", JSON.stringify(error.response?.data, null, 2))
    throw new Error(errorMessage)
  }
}