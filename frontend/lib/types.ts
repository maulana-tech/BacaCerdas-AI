import type React from "react"

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
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface StoryTag {
  id: string
  tag: string
  createdAt: string
  updatedAt: string
}

export interface Quiz {
  id: string
  title: string
  content: QuizQuestion[]
  source_document?: string
  createdAt: string
  updatedAt: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  correct_answer: number
  explanation?: string
}

export interface Summary {
  id: string
  title: string
  content: string
  source_document?: string
  createdAt: string
  updatedAt: string
}

