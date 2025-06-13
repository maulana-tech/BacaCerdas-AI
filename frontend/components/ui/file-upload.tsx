"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, File, X } from "lucide-react"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number // in MB
}

export default function FileUpload({ onFileSelect, accept = ".pdf,.doc,.docx", maxSize = 10 }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File terlalu besar. Maksimal ${maxSize}MB`)
      return
    }
    setSelectedFile(file)
    onFileSelect(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">Drag & drop file atau klik untuk upload</p>
          <p className="text-sm text-gray-500 mb-4">Mendukung PDF, DOC, DOCX (maksimal {maxSize}MB)</p>
          <Button onClick={() => fileInputRef.current?.click()} variant="outline">
            Pilih File
          </Button>
          <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileInputChange} className="hidden" />
        </div>
      ) : (
        <div className="border rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <File className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={removeFile}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
