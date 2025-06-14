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
        title: data.title,
        courseId: data.courseId || "default",
        userId: session.user.id,
        description: data.description || "",
        content: data.content.map((question: any) => ({
          question: question.question,
          type: question.type,
          options: question.type === 'multiple_choice' ? question.options.map((opt: any, index: number) => ({
            id: index,
            text: opt.text,
            is_correct: question.correct_answer === index
          })) : undefined,
          correct_answer: question.type === 'multiple_choice' ? undefined : question.correct_answer,
          explanation: question.explanation || "",
          points: question.points || 1
        }))
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

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    const apiClient = new ApiClient();
    if (id) {
      // Fetch single quiz
      const response = await (await apiClient.withAuthServer()).get(`/quizzes/${id}`);
      return Response.json(response.data, { status: 200 });
    } else {
      // Fetch all quizzes
      const response = await (await apiClient.withAuthServer()).get('/quizzes');
      return Response.json(response.data, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching quiz(zes):', error);
    return Response.json(
      { error: 'Failed to fetch quiz(zes)' },
      { status: 500 }
    );
  }
}
