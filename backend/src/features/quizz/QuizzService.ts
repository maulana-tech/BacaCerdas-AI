import prisma from "../../lib/prisma";
import { NotFoundException } from "../../lib/exceptions";
import ResponseBuilder from "../../lib/response-builder";

interface QuizQuestion {
  question: string;
  type: "multiple_choice" | "essay";
  options?: Array<{
    id: number;
    text: string;
    is_correct: boolean;
  }>;
  correct_answer?: number | string;
  explanation?: string;
  points?: number;
}

interface QuizData {
  title: string;
  courseId: string;
  userId: string;
  description?: string;
  content: QuizQuestion[];
}

export default class QuizzService {
  async getAllQuizzes() {
    const quizzes = await prisma.quizz.findMany({
      include: {
        QuizzAnswer: true,
        UserQuizz: true,
      },
    });

    return new ResponseBuilder(quizzes).setExcludedFields([]).build("quizzes");
  }

  async getQuizById(id: string) {
    const quiz = await prisma.quizz.findUnique({
      where: { id },
      include: {
        QuizzAnswer: true,
        UserQuizz: true,
      },
    });

    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }

    return new ResponseBuilder(quiz).setExcludedFields([]).build("quizzes");
  }

  async createQuiz(data: QuizData) {
    const { title, courseId, description, content, userId } = data;

    const quiz = await prisma.quizz.create({
      data: {
        title,
        courseId,
        description,
        userId,
        UserQuizz: {
          create: {
            userId,
            highestScore: 0,
            totalAttempts: 0,
          },
        },
      },
    });

    // Create quiz answers
    await Promise.all(
      content.map((question: QuizQuestion) =>
        prisma.quizzAnswer.create({
          data: {
            quizzId: quiz.id,
            userId,
            question: question.question,
            answer: JSON.stringify({
              options: question.options,
              correct_answer: question.correct_answer,
              explanation: question.explanation,
              points: question.points,
            }),
            isCorrect: false,
          },
        }),
      ),
    );

    return new ResponseBuilder(quiz).setExcludedFields([]).build("quizzes");
  }

  async updateQuiz(id: string, data: QuizData) {
    const quiz = await prisma.quizz.findUnique({
      where: { id },
    });

    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }

    const { title, description, content, userId } = data;

    // Update basic quiz info
    const updatedQuiz = await prisma.quizz.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    // Delete existing answers
    await prisma.quizzAnswer.deleteMany({
      where: { quizzId: id },
    });

    // Create new answers
    await Promise.all(
      content.map((question: QuizQuestion) =>
        prisma.quizzAnswer.create({
          data: {
            quizzId: quiz.id,
            userId,
            question: question.question,
            answer: JSON.stringify({
              options: question.options,
              correct_answer: question.correct_answer,
              explanation: question.explanation,
              points: question.points,
            }),
            isCorrect: false,
          },
        }),
      ),
    );

    return new ResponseBuilder(updatedQuiz)
      .setExcludedFields([])
      .build("quizzes");
  }

  async deleteQuiz(id: string) {
    const quiz = await prisma.quizz.findUnique({
      where: { id },
    });

    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    }

    // Delete quiz and related records
    await prisma.$transaction([
      prisma.quizzAnswer.deleteMany({
        where: { quizzId: id },
      }),
      prisma.userQuizz.deleteMany({
        where: { quizzId: id },
      }),
      prisma.quizz.delete({
        where: { id },
      }),
    ]);

    return new ResponseBuilder({ message: "Quiz deleted successfully" })
      .setExcludedFields([])
      .build("quizzes");
  }
}
