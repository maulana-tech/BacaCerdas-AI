"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Printer } from "lucide-react"

const reportTypes = [
  "Ringkasan Pembelajaran",
  "Kemajuan Siswa",
  "Performa Mata Pelajaran",
  "Analisis Prestasi",
  "Laporan Aktivitas",
  "Efektivitas Pembelajaran",
]

const dummyReportData = {
  "Ringkasan Pembelajaran": [
    { id: 1, metric: "Total Siswa Aktif", value: "2,847" },
    { id: 2, metric: "Materi Diselesaikan", value: "15,234" },
    { id: 3, metric: "Rata-rata Nilai", value: "85.7" },
    { id: 4, metric: "Tingkat Penyelesaian", value: "87.5%" },
    { id: 5, metric: "Prestasi Diraih", value: "1,847" },
  ],
  "Kemajuan Siswa": [
    { id: 1, metric: "Siswa Baru", value: "234" },
    { id: 2, metric: "Tingkat Retensi", value: "92.3%" },
    { id: 3, metric: "Kemajuan Rata-rata", value: "94.2%" },
    { id: 4, metric: "Sertifikat Diterbitkan", value: "456" },
    { id: 5, metric: "Tingkat Kepuasan", value: "4.8/5" },
  ],
  // Add more report types here
}

export function ReportsTab() {
  const [selectedReport, setSelectedReport] = useState(reportTypes[0])

  const handleGenerateReport = () => {
    console.log(`Generating ${selectedReport} report...`)
  }

  const handleDownloadReport = () => {
    console.log(`Downloading ${selectedReport} report...`)
  }

  const handlePrintReport = () => {
    console.log(`Printing ${selectedReport} report...`)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Laporan Pembelajaran</h3>
        <div className="flex items-center space-x-2">
          <Button onClick={handleDownloadReport} variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Unduh
          </Button>
          <Button onClick={handlePrintReport} variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Cetak
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Generator Laporan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Pilih jenis laporan" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateReport}>Generate Laporan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{selectedReport}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metrik</TableHead>
                <TableHead>Nilai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(dummyReportData[selectedReport as keyof typeof dummyReportData] || []).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.metric}</TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
