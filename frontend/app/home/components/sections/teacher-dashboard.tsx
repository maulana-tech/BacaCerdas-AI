"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ApiClient from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2 } from "lucide-react";

import { useTeacherStories } from "../../hooks/use-teacher-stories";
import { StoryApiResponse } from "../../generate/siswa/action";
import { Skeleton } from "@/components/ui/skeleton";

export function TeacherDashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: storiesData, isLoading, isError } = useTeacherStories();

  const handleEditStory = (storyId: string) => {
    router.push(`/home/generate/guru?id=${storyId}`);
  };

  const handleCreateNewStory = () => {
    router.push('/home/generate/guru');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Cerita Saya</h2>
        <Button onClick={handleCreateNewStory} className="rounded-2xl">
          <Plus className="h-4 w-4 mr-2" />
          Buat Cerita Baru
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(6)].map((_, index) => (
            <Card key={index} className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </Card>
          ))
        ) : isError ? (
          <div className="col-span-full">
            <Card className="p-6">
              <p className="text-center text-red-500">Gagal memuat cerita. Silakan coba lagi nanti.</p>
            </Card>
          </div>
        ) : !storiesData?.data.length ? (
          <div className="col-span-full">
            <Card className="p-6">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Belum ada cerita yang dibuat</p>
                <Button 
                  onClick={handleCreateNewStory} 
                  className="mx-auto"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Mulai Buat Cerita
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          storiesData.data.map((story) => (
            <Card key={story.attributes.id} className="p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold line-clamp-2">{story.attributes.title}</h3>
                {story.relationships?.Tag && (
                  <Badge variant="secondary">
                    {story.relationships.Tag.attributes.tag}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {formatDate(story.attributes.createdAt instanceof Date ? story.attributes.createdAt.toISOString() : story.attributes.createdAt)}
              </p>
              
              <div className="flex-grow">
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: story.attributes.content }}
                />
              </div>

              <Button
                onClick={() => handleEditStory(story.attributes.id)}
                className="mt-4 w-full"
                variant="outline"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Cerita
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
