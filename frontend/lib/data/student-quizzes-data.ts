import { Quiz } from "@/lib/types";

export const studentQuizzes: Quiz[] = [
  {
    id: 'quiz-001',
    title: 'Kuis Cerdik Si Kancil',
    description: 'Uji pemahamanmu tentang cerita Kancil dan Buaya.',
    courseId: 'course-fabel-01', // Merujuk ke sebuah ID kursus
    userId: 'user-guru-alpha', // ID pembuat kuis
    created_at: '2025-06-10T11:00:00.000Z',
    updated_at: '2025-06-10T11:00:00.000Z',
    content: [
      {
        question: 'Hewan apa yang ingin dimakan oleh buaya di cerita ini?',
        type: 'multiple_choice',
        points: 10,
        options: [
          { id: 1, text: 'Kancil', is_correct: true },
          { id: 2, text: 'Kelinci', is_correct: false },
          { id: 3, text: 'Monyet', is_correct: false },
          { id: 4, text: 'Gajah', is_correct: false },
        ],
        explanation: 'Dalam cerita ini, para buaya lapar ingin memangsa Kancil.',
      },
      {
        question: 'Jelaskan dengan singkat bagaimana Kancil bisa menipu buaya!',
        type: 'essay',
        points: 25,
        correct_answer: 'Kancil berpura-pura diutus raja untuk menghitung jumlah buaya di sungai.',
      },
    ],
  },
  {
    id: 'quiz-002',
    title: 'Kuis Legenda Malin Kundang',
    description: 'Seberapa baik kamu tahu cerita Malin Kundang?',
    courseId: 'course-legenda-01',
    userId: 'user-guru-alpha',
    created_at: '2025-06-12T16:00:00.000Z',
    updated_at: '2025-06-12T16:00:00.000Z',
    content: [
      {
        question: 'Menjadi apa Malin Kundang setelah dikutuk oleh ibunya?',
        type: 'multiple_choice',
        points: 10,
        options: [
          { id: 1, text: 'Pohon', is_correct: false },
          { id: 2, text: 'Gunung', is_correct: false },
          { id: 3, text: 'Batu', is_correct: true },
          { id: 4, text: 'Sungai', is_correct: false },
        ],
      },
    ],
  },
];