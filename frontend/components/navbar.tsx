"use client";

import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <Link href="/" className="flex items-center gap-2">
        <Image 
          src="/logo.svg" 
          width={32} 
          height={32} 
          alt="BacaCerdas-AI Logo"
          className="h-8 w-auto"
        />
        <span className="font-bold text-lg hidden sm:inline text-zinc-900">BacaCerdas-AI</span>
      </Link>
      
      <div className="flex items-center gap-4">
        {/* Auth links - akan diintegrasikan dengan sistem auth baru */}
        <Link 
          href="/auth/login"
          className="text-zinc-700 hover:text-zinc-900 text-sm px-3 py-2 rounded-md transition-colors"
        >
          Masuk
        </Link>
        <Link 
          href="/auth/registera"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition-colors"
        >
          Daftar
        </Link>
      </div>
    </header>
  );
}