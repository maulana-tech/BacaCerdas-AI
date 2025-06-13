import { QuizQuestion } from './types';

interface QuizData {
  title: string;
  courseId: string;
  description?: string;
  content: QuizQuestion[];
}

export async function saveQuiz(data: QuizData, quizId?: string): Promise<any> {
  // Call your backend API directly
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1';
  const response = await fetch(`${baseUrl}/quizz`, {
    method: quizId ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quizId ? { ...data, id: quizId } : data),
  });

  if (!response.ok) {
    throw new Error('Failed to save quiz');
  }

  return response.json();
}

export async function loadQuiz(id: string): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1';
  const response = await fetch(`${baseUrl}/quizz/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to load quiz');
  }

  const data = await response.json();
  
  // Transform the data back into the format our frontend expects
  return {
    ...data,
    content: data.answers.map((answer: any) => {
      const answerData = JSON.parse(answer.answer);
      return {
        question: answer.question,
        type: answerData.options ? 'multiple_choice' : 'essay',
        options: answerData.options,
        correct_answer: answerData.correct_answer,
        explanation: answerData.explanation,
        points: answerData.points
      };
    })
  };
}
