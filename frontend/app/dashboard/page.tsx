"use client";

// Impor komponen konten spesifik dashboard yang asli
import { AccountsOverview } from "./components/accounts-overview";
import { BusinessMetrics } from "./components/business-metrics";
import { DashboardContent } from "./components/dashboard-content";
import { QuickBillPay } from "./components/quick-assignnment-submission";
import { RecentTransactions } from "./components/recent-learning-activities";


// Konten spesifik untuk rute /dashboard
function MainDashboardPageContent() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AccountsOverview />
        </div>
        <div className="lg:col-span-1">
          <RecentTransactions />
        </div>
        <div className="lg:col-span-1">
          <QuickBillPay />
        </div>
      </div>
      <BusinessMetrics />
    </div>
  );
}

// Halaman utama untuk rute /dashboard
export default function DashboardPage() {
  return (
    <DashboardContent>
      <MainDashboardPageContent /> {/* Meneruskan konten utama dashboard sebagai children */}
    </DashboardContent>
  );
}