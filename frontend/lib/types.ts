import type React from "react"

export interface UserAttributes {
  id: string;
  name: string;
}

export type APIResponse<
  Type extends string,
  Attributes,
  Relationships = unknown,
> = {
  type: Type;
  attributes: Attributes;
  relationships?: Relationships;
};

export interface App {
  id: number
  name: string
  icon: React.ReactNode
  description: string
  category: string
  recent: boolean
  new: boolean
  progress: number
}

export interface RecentFile {
  name: string
  app: string
  modified: string
  icon: React.ReactNode
  shared: boolean
  size: string
  collaborators: number
}

export interface Project {
  name: string
  description: string
  progress: number
  dueDate: string
  members: number
  files: number
}

export interface Tutorial {
  title: string
  description: string
  duration: string
  level: string
  instructor: string
  category: string
  views: string
}

export interface CommunityPost {
  title: string
  author: string
  likes: number
  comments: number
  image: string
  time: string
}

export interface SidebarItem {
  title: string
  icon: React.ReactNode
  isActive?: boolean
  badge?: string
  items?: Array<{
    title: string
    url: string
    badge?: string
  }>
}

export interface Story {
  id: string;
  title: string;
  content: string;
  type: string;
  userId: string;
  tagId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoryResponse {
  attributes: Story & { thumbnailUrl: string };
  relationships: {
    Tag?: { attributes: StoryTag };
    User?: { attributes: UserAttributes };
  };
}

export interface StoryTag {
  id: string;
  tag: string;
}


export const STORY_TAGS = [
  "Umum",
  "Anak-anak",
  "Remaja",
  "Pertualangan",
  "Fiksi",
  "Non-fiksi",
  "Teknologi",
  "Pendidikan",
] as const;

export type StoryTagType = typeof STORY_TAGS[number];

export interface QuizQuestion {
  question: string
  type: "multiple_choice" | "essay"
  options?: Array<{
    id: number
    text: string
    is_correct: boolean
  }>
  correct_answer?: number | string
  explanation?: string
  points?: number
}

export interface Quiz {
  id: string
  title: string
  description?: string
  content: QuizQuestion[]
  created_at: string
  updated_at: string
  courseId: string;
  userId: string;
}

export interface QuizAnswer {
  questionIndex: number
  type: "multiple_choice" | "essay"
  answer: number | string 
}

export type Course = {
  id: string;
  slug: string;
  teacherId: string;
  courseAssetId: string;
  name: string;
  description: string | null;
  type: string; 
  tags: string[];
  createdAt: string; 
  updatedAt: string;
};

export type SummarizedCourse = {
  id: string;
  courseId: string;
  userId: string;
  summary: string;
  rating: number | null;
  feedback: string | null;
  createdAt: string;
  updatedAt: string;

  Course?: Course;
  User?: UserAttributes;
};

export interface Summary {
  id: string
  title: string
  content: string
  source_document?: string
  createdAt: string
  updatedAt: string
}

export enum ItemType {
  STORY = 'STORY',
  QUIZ = 'QUIZ',
  SUMMARY = 'SUMMARY'
}


export type StoryTagApiResponse = APIResponse<"story-tags", {
  id: string;
  tag: string;
}>;

