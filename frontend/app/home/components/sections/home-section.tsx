// components/home-section.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HeroSection } from "./hero-section"; // Ensure this points to your HeroSection component
import { AppCard } from "../cards/app-card";
import { FileRow } from "../cards/file-row";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { apps, recentFiles, projects, communityPosts } from "@/lib/data/sample-data";

import { Heart, MessageSquare, FileText, Users } from "lucide-react";

export function HomeSection() {
  return (
    <div className="space-y-8">
      <HeroSection
        title="Welcome to BacaCerdas AI Creative Suite"
        description="Unleash your creativity with our comprehensive AI of tools and resources."
        primaryAction={
          <Button className="bg-white text-black hover:bg-gray-200">
            Explore Plans
          </Button>
        }
        secondaryAction={
          <Button className="bg-white text-black hover:bg-gray-200">
            Take a Tour
          </Button>
        }
        badge="Premium"
        gradient="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600"
      />

      {/* Recent Apps */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Recent Apps</h2>
          <Button variant="ghost" className="rounded-2xl text-primary">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {apps
            .filter((app) => app.recent)
            .map((app) => (
              <AppCard key={app.name} app={app} />
            ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Recent Files */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Recent Files</h2>
            <Button variant="ghost" className="rounded-2xl text-primary">
              View All
            </Button>
          </div>
          <div className="rounded-3xl border">
            <div className="grid grid-cols-1 divide-y">
              {recentFiles.slice(0, 4).map((file) => (
                <FileRow key={file.name} file={file} />
              ))}
            </div>
          </div>
        </section>

        {/* Active Projects */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Active Projects</h2>
            <Button variant="ghost" className="rounded-2xl text-primary">
              View All
            </Button>
          </div>
          <div className="rounded-3xl border">
            <div className="grid grid-cols-1 divide-y">
              {projects.slice(0, 3).map((project) => (
                <motion.div key={project.name} whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{project.name}</h3>
                    <Badge variant="outline" className="rounded-xl">
                      Due {project.dueDate}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2 rounded-xl" />
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {project.members} members
                    </div>
                    <div className="flex items-center">
                      <FileText className="mr-1 h-4 w-4" />
                      {project.files} files
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Community Highlights */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Community Highlights</h2>
          <Button variant="ghost" className="rounded-2xl text-primary">
            Explore
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {communityPosts.map((post) => (
            <motion.div key={post.title} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
              <Card className="overflow-hidden rounded-3xl">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    height={300}
                    width={400}
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">by {post.author}</p>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      {post.likes}
                      <MessageSquare className="ml-2 h-4 w-4 text-blue-500" />
                      {post.comments}
                    </div>
                    <span className="text-muted-foreground">{post.time}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}