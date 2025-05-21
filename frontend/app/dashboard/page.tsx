"use client"

import { ProgressCard } from "./components/progress-card"
import { ActivityChart } from "./components/activity-chart"
import { RecentActivity } from "./components/recent-activity"
import { ReadingGoals } from "./components/reading-goals"
import { BookOpen, Clock, BookMarked, Brain } from "lucide-react"
import { useState, useEffect } from "react"

export default function Dashboard() {
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        // Simulasi loading data
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1500)
        
        return () => clearTimeout(timer)
    }, [])
    
    return (
        <div className="p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6">Ringkasan</h1>

            {/* Statistic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <ProgressCard 
                    title="Buku Dibaca" 
                    value={7} 
                    maxValue={10} 
                    icon={<BookOpen className="h-6 w-6" />} 
                    loading={loading}
                />
                <ProgressCard 
                    title="Waktu Membaca" 
                    value={12} 
                    maxValue={20} 
                    icon={<Clock className="h-6 w-6" />} 
                    loading={loading}
                />
                <ProgressCard 
                    title="Catatan Dibuat" 
                    value={24} 
                    maxValue={50} 
                    icon={<BookMarked className="h-6 w-6" />} 
                    loading={loading}
                />
                <ProgressCard 
                    title="Pemahaman" 
                    value={85} 
                    maxValue={100} 
                    icon={<Brain className="h-6 w-6" />} 
                    loading={loading}
                />
            </div>
            
            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <ActivityChart loading={loading} />
                <div className="grid grid-cols-1 gap-4">
                    <ReadingGoals loading={loading} />
                    <RecentActivity loading={loading} />
                </div>
            </div>
        </div>
    )
}