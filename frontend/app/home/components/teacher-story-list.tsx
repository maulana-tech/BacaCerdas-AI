"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ApiClient from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Story {
  id: string;
  attributes: {
    title: string;
    content: string;
    createdAt: string;
  };
  relationships?: {
    Tag?: {
      attributes: {
        tag: string;
      };
    };
  };
}

export default function TeacherStoryList() {
  const [stories, setStories] = useState<Story[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      loadStories();
    }
  }, [session]);

  const loadStories = async () => {
    try {
      const apiClient = new ApiClient();
      const api = await apiClient.withAuthServer();
      const response = await api.get("/stories");
      setStories(response.data.data || []);
    } catch (error) {
      console.error("Error loading stories:", error);
    }
  };

  const handleEditStory = (storyId: string) => {
    router.push(`/home/generate/guru?id=${storyId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  if (!stories.length) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">Belum ada cerita yang dibuat</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stories.map((story) => (
        <Card key={story.id} className="p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold line-clamp-2">{story.attributes.title}</h3>
            {story.relationships?.Tag && (
              <Badge variant="secondary">
                {story.relationships.Tag.attributes.tag}
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            {formatDate(story.attributes.createdAt)}
          </p>
          
          <div className="flex-grow">
            <p className="text-gray-600 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: story.attributes.content }}
            />
          </div>

          <Button
            onClick={() => handleEditStory(story.id)}
            className="mt-4 w-full"
            variant="outline"
          >
            Edit Cerita
          </Button>
        </Card>
      ))}
    </div>
  );
}
