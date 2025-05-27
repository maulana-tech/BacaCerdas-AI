"use client"

import { Download, Search } from "lucide-react"
import { HeroSection } from "./hero-section"
import { AppCard } from "../cards/app-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { apps } from "@/lib/data/sample-data"

export function AppsSection() {
  return (
    <div className="space-y-8">
      <HeroSection
        title="Creative Apps Collection"
        description="Discover our full suite of professional design and creative applications."
        primaryAction={
          <div className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Install Desktop App
          </div>
        }
        gradient="bg-gradient-to-r from-pink-600 via-red-600 to-orange-600"
      />

      {/* Filters and Search */}
      <div className="flex flex-wrap gap-3 mb-6 text-foreground">
        <Button variant="outline" className="rounded-2xl text-primary">
          All Categories
        </Button>
        <Button variant="outline" className="rounded-2xl">
          Creative
        </Button>
        <Button variant="outline" className="rounded-2xl">
          Video
        </Button>
        <Button variant="outline" className="rounded-2xl">
          Web
        </Button>
        <Button variant="outline" className="rounded-2xl">
          3D
        </Button>
        <div className="flex-1"></div>
        <div className="relative w-full md:w-auto mt-3 md:mt-0">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search apps..." className="w-full rounded-2xl pl-9 md:w-[200px]" />
        </div>
      </div>

      {/* New Releases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">New Releases</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {apps
            .filter((app) => app.new)
            .map((app) => (
              <AppCard key={app.name} app={app} showProgress />
            ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">All Apps</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {apps.map((app) => (
            <AppCard key={app.name} app={app} showCategory />
          ))}
        </div>
      </section>
    </div>
  )
}
