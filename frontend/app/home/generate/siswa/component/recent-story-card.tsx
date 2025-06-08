import { FileText, Calendar, Eye, MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { StoryApiResponse } from "../action";

interface RecentStoryCardProps {
  story: StoryApiResponse;
  showDetails?: boolean;
}

export function RecentStoryCard({ story, showDetails = false }: RecentStoryCardProps) {
  const { attributes, relationships } = story;
  const formattedDate = new Date(attributes.createdAt).toLocaleDateString();
  
  return (
    <motion.div
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      className={
        showDetails
          ? "p-3 md:grid md:grid-cols-12 items-center flex flex-col md:flex-row gap-3 md:gap-0"
          : "flex items-center justify-between p-4"
      }
    >
      <div className={showDetails ? "col-span-6 flex items-center gap-3 w-full md:w-auto" : "flex items-center gap-3"}>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
          <FileText className="text-blue-500" />
        </div>
        <div>
          <p className="font-medium text-foreground">{attributes.title || "Untitled Story"}</p>
          {showDetails ? (
            relationships?.User && (
              <div className="flex items-center text-xs text-muted-foreground">
                Oleh {relationships.User.attributes.name}
              </div>
            )
          ) : (
            <p className="text-sm text-muted-foreground">
              Cerita • {formattedDate}
            </p>
          )}
        </div>
      </div>

      {showDetails ? (
        <>
          <div className="col-span-2 text-sm md:text-base">Cerita</div>
          <div className="col-span-2 text-sm md:text-base">{attributes.content.length} karakter</div>
          <div className="col-span-2 flex items-center justify-between w-full md:w-auto">
            <span className="text-sm md:text-base">{formattedDate}</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2">
          {relationships?.Tag && (
            <Badge variant="outline" className="rounded-xl">
              {relationships.Tag.attributes.tag || "Uncategorized"}
            </Badge>
          )}
          <Link href={`/home/generate/siswa/story/${attributes.id}`}>
            <Button variant="ghost" size="sm" className="rounded-xl text-foreground">
              Buka
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
}