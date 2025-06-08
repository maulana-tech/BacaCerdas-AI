'use client';

import { useQuery } from '@tanstack/react-query';
import { getAPIStories } from '@/app/home/generate/siswa/action';
import type { StoryApiResponse } from '@/app/home/generate/siswa/action';

export function useStories() {
  return useQuery<{ data: StoryApiResponse[] }>({ 
    queryKey: ['stories'],
    queryFn: async () => {
      try {
        return await getAPIStories();
      } catch (error) {
        console.error('Error fetching stories:', error);
        return { data: [] };
      }
    },
    staleTime: 5 * 60 * 1000, // Data tetap fresh selama 5 menit
    refetchOnWindowFocus: false, // Tidak perlu refetch saat focus window
  });
}