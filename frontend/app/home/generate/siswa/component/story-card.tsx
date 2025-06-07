import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { Calendar, Eye, MessageCircle } from "lucide-react"
import { StoryApiResponse } from "../action";

export default function StoryCard(props: StoryApiResponse) {
    return (
        <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-md hover:shadow-lg dark:shadow-slate-900/30 transition-all duration-500 overflow-hidden border border-white/60 dark:border-white/10 rounded-2xl group">
            <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
                    <div className="flex-1 order-2 sm:order-1">
                        <div className="flex items-start justify-between mb-3 md:mb-4">
                            <Badge
                                variant="secondary"
                                className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50 px-3 py-1 rounded-full text-xs font-medium"
                            >
                                {props.relationships?.Tag.attributes.tag || "Uncategorized"}
                            </Badge>
                        </div>

                        <Link href={`/story/#`}>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 md:mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {props.attributes.title || "Untitled Story"}
                            </h2>
                        </Link>

                        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mb-4 md:mb-6 line-clamp-2 md:line-clamp-3 leading-relaxed">
                            {props.attributes.content || "No content available for this story. Please check back later."}
                        </p>

                        <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-3 md:mb-4">
                            oleh <span className="font-medium text-slate-700 dark:text-slate-300">{props.relationships?.User.attributes.name}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                                <span>{(new Date(props.attributes.createdAt)).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                                <Eye className="h-3 w-3 md:h-4 md:w-4" />
                                <span>{"1k"}</span>
                            </div>
                            <div className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
                                <span>{"2k"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-shrink-0 order-1 sm:order-2 mx-auto sm:mx-0">
                        <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg dark:shadow-slate-900/30 dark:hover:shadow-slate-900/40 transition-all duration-500 transform group-hover:translate-y-[-3px]">
                            <Image
                                src={"/images/placeholder-image.png"}
                                alt={"Story Image"}
                                width={300}
                                height={200}
                                className="w-80 h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}