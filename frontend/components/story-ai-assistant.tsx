"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Bot, User, Copy, ArrowRight, Sparkles } from "lucide-react"
import { useChat } from "ai/react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface StoryAIAssistantProps {
  onUseStory: (content: string, title?: string) => void
}

export default function StoryAIAssistant({ onUseStory }: StoryAIAssistantProps) {
  const [storyType, setStoryType] = useState("umum")
  const [quickPrompts] = useState([
    "Dongeng modern untuk anak-anak",
    "Cerita petualangan yang menegangkan",
  ])

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/ai/story",
    body: ({ input }: { input: string }) => ({
      prompt: input,
      storyType,
    }),
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleQuickPrompt = (prompt: string) => {
    const syntheticEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>

    handleInputChange({
      target: { value: prompt },
    } as React.ChangeEvent<HTMLInputElement>)

    setTimeout(() => {
      handleSubmit(syntheticEvent)
    }, 100)
  }

  const cleanContent = (content: string) => {
    return content
      .replace(/```html\s*/g, '') // Remove opening ```html
      .replace(/```\s*/g, '')     // Remove closing ```
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/style="[^"]*"/gi, '')
      .trim();
  };

  const extractStoryContent = (content: string) => {
    const cleanedContent = cleanContent(content);
    const titleMatch = cleanedContent.match(/<h[1-3]>(.*?)<\/h[1-3]>/);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, "") : "";

    return { content: cleanedContent, title };
  }

  const handleUseStory = (messageContent: string) => {
    const { content, title } = extractStoryContent(messageContent);
    onUseStory(content, title);
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI Story Assistant
            </CardTitle>
            <div className="flex gap-2">
              <Select value={storyType} onValueChange={setStoryType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="umum">Umum</SelectItem>
                  <SelectItem value="anak">Anak-anak</SelectItem>
                  <SelectItem value="remaja">Remaja</SelectItem>
                  <SelectItem value="petualangan">Petualangan</SelectItem>
                  <SelectItem value="inspiratif">Inspiratif</SelectItem>
                </SelectContent>
              </Select>
              {messages.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearChat}>
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Quick Prompts */}
          {messages.length === 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Prompt Cepat:</h3>
              <div className="grid grid-cols-1 gap-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="justify-start text-left h-auto p-3"
                    onClick={() => handleQuickPrompt(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <ScrollArea className="flex-1 min-h-[300px]" ref={scrollAreaRef}>
            <div className="space-y-4 pr-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === "user" ? "bg-blue-500" : "bg-purple-500"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900 border"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <div>
                          <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ 
                              __html: cleanContent(message.content) 
                            }}
                          />
                          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => navigator.clipboard.writeText(message.content)}
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </Button>
                            <Button size="sm" onClick={() => handleUseStory(message.content)}>
                              <ArrowRight className="h-3 w-3 mr-1" />
                              Use Story
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ceritakan ide cerita Anda atau minta bantuan AI..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
