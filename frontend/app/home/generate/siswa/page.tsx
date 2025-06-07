import { getAPIStories } from "./action";

import { HomeAppLayout } from "../../components/home-app-layout";
import StoryCard from "./component/story-card";

// Page component sekarang menjadi async
export default async function Page() {

  const stories = await getAPIStories();

  if (!stories.data.length) {
    return (
      <HomeAppLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Tidak ada cerita yang tersedia</h1>
          <p className="text-slate-600 dark:text-slate-300">Silakan kembali lagi nanti.</p>
        </div>
      </HomeAppLayout>
    );
  }

  return (
    <HomeAppLayout>
      <div className="flex flex-col gap-y-12">
        {
          stories.data.map((story) => (
            <StoryCard key={story.attributes.id} {...story} />
          ))
        }
      </div>
    </HomeAppLayout>
  );
}
