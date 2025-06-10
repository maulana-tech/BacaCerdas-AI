'use client';

import { useQuery } from '@tanstack/react-query';
import { StoryApiResponse } from '../generate/siswa/action';
import ApiClient from '@/lib/api';

async function getTeacherStories() {
  const apiClient = new ApiClient();
  const api = await apiClient.withAuthServer();
  
  try {
    const response = await api.get<{ data: StoryApiResponse[] }>("/users/stories");
    return response.data;
  } catch (error) {
    console.error('Error fetching teacher stories:', error);
    // Return empty array instead of throwing to handle gracefully in UI
    return { data: [] };
  }
}

export function useTeacherStories() {
  return useQuery<{ data: StoryApiResponse[] }>({
    queryKey: ['teacher-stories'],
    queryFn: getTeacherStories,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    refetchOnWindowFocus: true, // Refetch when window gains focus
    retry: 1, // Only retry once on failure
    placeholderData: { data: [] }
  });
}
