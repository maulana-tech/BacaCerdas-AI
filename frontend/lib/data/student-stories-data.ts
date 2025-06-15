import { Story } from "@/lib/types";

type StoryWithThumbnail = Story & { thumbnailUrl: string };

export const studentStories: StoryWithThumbnail[] = [
  {
    id: 'story-001',
    title: 'Kancil dan Buaya yang Cerdik',
    content: 'Kisah klasik tentang si kancil yang menggunakan kecerdikannya untuk menyeberangi sungai yang penuh dengan buaya lapar.',
    type: 'Fabel', // Properti 'type' ditambahkan
    userId: 'user-guru-alpha', // ID pembuat cerita
    tagId: 'tag-01', // Merujuk ke tag "Fabel"
    createdAt: new Date('2025-06-10T09:00:00Z'),
    updatedAt: new Date('2025-06-10T09:00:00Z'),
    thumbnailUrl: '/images/thumbnails/kancil-dan-buaya.png',
  },
  {
    id: 'story-002',
    title: 'Malin Kundang, Anak Durhaka',
    content: 'Cerita rakyat dari Sumatera Barat tentang seorang anak yang durhaka pada ibunya dan dikutuk menjadi batu.',
    type: 'Legenda',
    userId: 'user-guru-alpha',
    tagId: 'tag-02', // Merujuk ke tag "Legenda"
    createdAt: new Date('2025-06-11T14:00:00Z'),
    updatedAt: new Date('2025-06-11T14:00:00Z'),
    thumbnailUrl: '/images/thumbnails/malin-kundang.png',
  },
  {
    id: 'story-003',
    title: 'Bawang Merah dan Bawang Putih',
    content: 'Kisah tentang dua saudara tiri dengan sifat yang bertolak belakang dan pelajaran tentang kebaikan dan kejahatan.',
    type: 'Dongeng',
    userId: 'user-guru-bravo',
    tagId: 'tag-03', // Merujuk ke tag "Dongeng"
    createdAt: new Date('2025-06-12T11:00:00Z'),
    updatedAt: new Date('2025-06-12T11:00:00Z'),
    thumbnailUrl: '/images/thumbnails/bawang-merah-putih.png',
  },
];