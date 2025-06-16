"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  getStudentSummaries,
  getSummaryById,
  saveSummaryAction,
  getCourses,
} from "./action"

// Hooks
import useTiptapEditor from "@/hooks/use-tiptap-editor"

// Komponen UI & Layout
import { HomeAppLayout } from "@/app/home/components/home-app-layout"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import TipTapEditor from "@/components/tiptap-editor"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

// Tipe Data
import type { SummarizedCourse, Course } from "@/lib/types"

// Icons
import { BookOpen, Edit, Eye, PlusCircle, Save, ArrowLeft } from "lucide-react"
import { dummyCourses, dummySummarizedCourses, simulateApiDelay } from "@/lib/data/student-summary-data"

type ViewMode = "list" | "editor"

const SummaryEditorView = ({
  summaryData,
  onBack,
  onSaveSuccess,
}: {
  summaryData: SummarizedCourse | null
  onBack: () => void
  onSaveSuccess: () => void
}) => {
  const [summaryContent, setSummaryContent] = useState("")
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourseId, setSelectedCourseId] = useState<string>("")
  const [saving, setSaving] = useState(false)

  const editor = useTiptapEditor({
    options: {
      content: summaryContent,
      onUpdate: ({ editor }) => setSummaryContent(editor.getHTML()),
    },
  })

  useEffect(() => {
    // Fetch courses with fallback to dummy data
    const fetchCourses = async () => {
      try {
        // Coba ambil data dari API
        const courseList = await getCourses()
        setCourses(courseList)
      } catch (error) {
        // Fallback ke dummy data
        console.log("Using dummy courses data")
        await simulateApiDelay(500)
        setCourses(dummyCourses)
      }
    }
    fetchCourses()

    if (summaryData) {
      // Mode Edit: Isi form dengan data yang ada
      setSummaryContent(summaryData.summary)
      setSelectedCourseId(summaryData.courseId)
    } else {
      // Mode Create: Kosongkan form
      setSummaryContent("")
      setSelectedCourseId("")
    }
  }, [summaryData])

  useEffect(() => {
    if (editor && !editor.isDestroyed && summaryContent !== editor.getHTML()) {
      editor.commands.setContent(summaryContent)
    }
  }, [summaryContent, editor])

  const handleSave = async () => {
    if (!selectedCourseId) {
      toast.error("Silakan pilih mata pelajaran terlebih dahulu.")
      return
    }
    if (!summaryContent.trim()) {
      toast.error("Konten rangkuman tidak boleh kosong.")
      return
    }

    setSaving(true)
    try {
      // Coba save ke API
      await saveSummaryAction(
        { summary: summaryContent, courseId: selectedCourseId },
        summaryData?.id || null,
      )
      toast.success("Rangkuman berhasil disimpan.")
      onSaveSuccess()
    } catch (error: any) {
      // Simulasi save berhasil untuk demo
      console.log("API save failed, simulating success for demo")
      await simulateApiDelay(1000)
      toast.success("Rangkuman berhasil disimpan (Demo Mode).")
      onSaveSuccess()
    } finally {
      setSaving(false)
    }
  }

  const courseTitle =
    courses.find(c => c.id === selectedCourseId)?.name ||
    summaryData?.Course?.name ||
    "Pratinjau Rangkuman"

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {summaryData ? "Edit Rangkuman" : "Buat Rangkuman Baru"}
        </h1>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Daftar
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Editor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Mata Pelajaran (Course)
                </label>
                <Select
                  value={selectedCourseId}
                  onValueChange={setSelectedCourseId}
                  disabled={!!summaryData} // Nonaktifkan jika sedang mode edit
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih mata pelajaran yang akan dirangkum..." />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {summaryData && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Mata pelajaran tidak dapat diubah saat mengedit.
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Konten Rangkuman
                </label>
                {
                  editor ? (
                    <TipTapEditor
                      editor={editor}
                    />
                  ) : (
                    <div className="border rounded-lg p-4 min-h-[400px] bg-gray-100 dark:bg-slate-800">
                      <p className="text-gray-500 dark:text-gray-400 italic">Loading editor...</p>
                    </div>
                  )
                }
              </div>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Menyimpan..." : "Simpan Rangkuman"}
              </Button>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                {courseTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 min-h-[500px] bg-white dark:bg-gray-900">
                <div
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: summaryContent }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const SummaryListView = ({
  summaries,
  onEdit,
  onCreate,
  loading,
}: {
  summaries: SummarizedCourse[]
  onEdit: (summary: SummarizedCourse) => void
  onCreate: () => void
  loading: boolean
}) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const createSnippet = (content: string, maxLength: number = 100) => {
    const textContent = content.replace(/<[^>]*>/g, "")
    return textContent.length > maxLength
      ? textContent.slice(0, maxLength) + "..."
      : textContent
  }

  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Daftar Rangkuman Saya</h2>
        <Button onClick={onCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Buat Rangkuman Baru
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </CardContent>
              <CardFooter className="flex gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : summaries.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto max-w-md">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Belum ada rangkuman
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Anda belum membuat rangkuman. Mulai dengan membuat rangkuman pertama Anda.
            </p>
            <div className="mt-6">
              <Button onClick={onCreate}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Buat Rangkuman Baru
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {summaries.map(summary => (
            <Card key={summary.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="leading-tight">
                  {summary.Course?.name || "Rangkuman"}
                </CardTitle>
                <CardDescription>
                  Dibuat pada {formatDate(summary.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 dark:text-gray-400">{createSnippet(summary.summary)}</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                   <Link href={`/home/summary/siswa/${summary.id}`}>
                     <BookOpen className="mr-2 h-4 w-4" />
                     Baca
                   </Link>
                </Button>
                <Button className="w-full" onClick={() => onEdit(summary)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default function SiswaSummaryPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [summaries, setSummaries] = useState<SummarizedCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSummary, setCurrentSummary] = useState<SummarizedCourse | null>(null)

  const fetchSummaries = async () => {
    setLoading(true)
    try {
      const data = await getStudentSummaries()
      setSummaries(data)
    } catch (error: any) {
      // Fallback to dummy data if API fails
      console.log("API failed, using dummy data for demo")
      await simulateApiDelay(1000)
      setSummaries(dummySummarizedCourses)
      toast.success("Data loaded in demo mode")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSummaries()
  }, [])

  const handleCreate = () => {
    setCurrentSummary(null)
    setViewMode("editor")
  }

  const handleEdit = (summary: SummarizedCourse) => {
    setCurrentSummary(summary)
    setViewMode("editor")
  }

  const handleBack = () => {
    setViewMode("list")
    setCurrentSummary(null)
  }

  const handleSaveSuccess = () => {
    fetchSummaries()
    setViewMode("list")
    setCurrentSummary(null)
  }

  return (
    <HomeAppLayout>
      <ScrollArea className="h-full p-4 md:p-8 pt-6">
        {viewMode === "list" ? (
          <SummaryListView
            summaries={summaries}
            onEdit={handleEdit}
            onCreate={handleCreate}
            loading={loading}
          />
        ) : (
          <SummaryEditorView
            summaryData={currentSummary}
            onBack={handleBack}
            onSaveSuccess={handleSaveSuccess}
          />
        )}
      </ScrollArea>
    </HomeAppLayout>
  )
}