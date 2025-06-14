import { type NextRequest } from "next/server"
import ApiClient from "@/lib/api"
import { auth } from '@/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const apiClient = new ApiClient()
    const api = await apiClient.withAuthServer()
    
    const response = await api.get(`/quizzes/${params.id}`)
    return Response.json(response.data)
  } catch (error: any) {
    console.error("Error fetching quiz:", error)
    return Response.json(
      { error: error.message || "Failed to fetch quiz" },
      { status: error.response?.status || 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const apiClient = new ApiClient()
    const api = await apiClient.withAuthServer()
    
    const body = await request.json()
    const response = await api.put(`/quizzes/${params.id}`, {
      data: {
        ...body,
        userId: session.user.id
      }
    })
    return Response.json(response.data)
  } catch (error: any) {
    console.error("Error updating quiz:", error)
    return Response.json(
      { error: error.message || "Failed to update quiz" },
      { status: error.response?.status || 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const apiClient = new ApiClient()
    const api = await apiClient.withAuthServer()
    
    await api.delete(`/quizzes/${params.id}`)
    return Response.json({ message: "Quiz deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting quiz:", error)
    return Response.json(
      { error: error.message || "Failed to delete quiz" },
      { status: error.response?.status || 500 }
    )
  }
}
