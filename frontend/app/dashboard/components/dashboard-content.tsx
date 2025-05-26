// components/dashboard-content.tsx
"use client";

import { useSidebar } from "@/components/ui/sidebar"; // Gunakan useSidebar hook
import { useEffect, useState } from "react";

export function DashboardContent({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isCollapsed, setIsCollapsed } = useSidebar(); // Ambil isCollapsed dan setIsCollapsed
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // Tambahkan state ini

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      // Jika di desktop dan sidebar mobile terbuka, tutup
      if (window.innerWidth >= 1024 && isMobileSidebarOpen) {
        setIsMobileSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobileSidebarOpen]);

  // useEffect untuk memastikan isMobileSidebarOpen disinkronkan dengan Sidebar (jika ada perubahan dari TopNav)
  // Ini penting agar `paddingLeft` di DashboardContent menyesuaikan dengan sidebar mobile
  useEffect(() => {
    // Anda mungkin perlu cara untuk mendapatkan status isMobileOpen dari Sidebar internal
    // Untuk saat ini, asumsikan kita bisa mendapatkan efek yang sama dengan memeriksa lebar layar
    // dan mengasumsikan toggle mobile dikelola oleh TopNav yang memanggil setIsCollapsed
    // Untuk sidebar mobile, kita perlu 'state' yang terpisah yang diatur oleh tombol mobile di TopNav.
    // Jika TopNav mengontrol setIsCollapsed, maka Sidebar akan mengikuti.
    // Untuk mobile, paddingLeft harusnya 0 saat sidebar mobile tertutup, dan 288px saat terbuka.
    // TopNav harus memicu setIsCollapsed(true) atau setIsCollapsed(false) untuk mobile.
    // KITA AKAN MODIFIKASI INI SAAT INTEGRASI PENUH.
  }, [isCollapsed, isMobile]); // isCollapsed di sini akan datang dari SidebarContext
  
  // Efek samping untuk menentukan apakah sidebar mobile sedang terbuka berdasarkan isCollapsed di TopNav
  // Ini adalah solusi sementara jika state isMobileOpen tidak bisa diakses langsung dari Sidebar
  useEffect(() => {
    if (isMobile) {
      // Di mobile, jika isCollapsed (yang dikontrol TopNav) adalah false, anggap sidebar terbuka
      setIsMobileSidebarOpen(!isCollapsed);
    } else {
      setIsMobileSidebarOpen(false); // Di desktop, sidebar mobile selalu tertutup
    }
  }, [isMobile, isCollapsed]);


  return (
    <div
      className="flex-1 bg-background transition-all duration-300 ease-in-out"
      style={{
        // Sesuaikan paddingLeft berdasarkan isMobile dan isCollapsed/isMobileSidebarOpen
        // Jika mobile, paddingLeft akan 0 jika sidebar mobile tertutup, atau 288px jika terbuka
        // Jika desktop, paddingLeft akan 72px jika collapsed, atau 288px jika expanded
        paddingLeft: isMobile
          ? (isMobileSidebarOpen ? '288px' : '0px')
          : (isCollapsed ? '72px' : '288px'),
      }}
    >
      {/* TopNav TELAH DIHILANGKAN DARI SINI, AKAN DIRENDER DI LAYOUT */}
      <div className="container mx-auto p-3 sm:p-4 md:p-6 max-w-7xl">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}