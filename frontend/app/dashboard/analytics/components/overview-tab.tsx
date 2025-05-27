"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OverviewCards } from "./overview-cards"
import { RevenueChart } from "./revenue-chart"
import { RecentTransactions } from "./recent-transactions"
import { AccountGrowth } from "./account-growth"

import { UserActivity } from "./user-activity"
import { KontenUnggulanBacaCerdas } from "./top-products"

export function OverviewTab() {
  const [comparisonPeriod, setComparisonPeriod] = useState("previous_month")

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Ringkasan Dashboard Pembelajaran</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Bandingkan dengan:</span>
          <Select value={comparisonPeriod} onValueChange={setComparisonPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous_week">Minggu Sebelumnya</SelectItem>
              <SelectItem value="previous_month">Bulan Sebelumnya</SelectItem>
              <SelectItem value="previous_quarter">Kuartal Sebelumnya</SelectItem>
              <SelectItem value="previous_year">Tahun Sebelumnya</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCards />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Tren Pembelajaran</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <RevenueChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Aktivitas Siswa Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Pertumbuhan Siswa</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AccountGrowth />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Mata Pelajaran Populer</CardTitle>
          </CardHeader>
          <CardContent>
            <KontenUnggulanBacaCerdas />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      </div>
    </>
  )
}
