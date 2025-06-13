import { type NextRequest } from 'next/server';
import ApiClient from '@/lib/api';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const apiClient = new ApiClient();
    const result = await (await apiClient.withAuthServer()).post('/quizzes', {
      data: {
        ...data,
        userId: session.user.id,
        courseId: data.courseId || "default"
      }
    });
    return Response.json(result.data, { status: 201 });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return Response.json(
      { error: 'Failed to create quiz' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, ...data } = await request.json();
    const apiClient = new ApiClient();
    const result = await (await apiClient.withAuthServer()).put(`/quizzes/${id}`, {
      data: {
        ...data,
        userId: session.user.id,
        courseId: data.courseId || "default"
      }
    });
    return Response.json(result.data);
  } catch (error) {
    console.error('Error updating quiz:', error);
    return Response.json(
      { error: 'Failed to update quiz' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = request.url.split('/').pop();
    if (!id) {
      return Response.json(
        { error: 'Quiz ID is required' },
        { status: 400 }
      );
    }
    
    const apiClient = new ApiClient();
    const result = await (await apiClient.withAuthServer()).get(`/quiz/${id}`);
    return Response.json(result.data);
  } catch (error) {
    console.error('Error loading quiz:', error);
    return Response.json(
      { error: 'Failed to load quiz' },
      { status: 500 }
    );
  }
}
