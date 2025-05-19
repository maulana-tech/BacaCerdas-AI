import type { Metadata, Viewport } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider, SignedOut, SignInButton, SignedIn, UserButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  preload: true,
  display: "swap",
  weight: ["600"],
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  preload: true,
  display: "swap",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BacaCerdas-AI - Platform Membaca Cerdas",
  description: "Platform membaca dan pembelajaran berbasis AI untuk meningkatkan pemahaman dan akuisisi pengetahuan",
  keywords: ["membaca", "AI", "pembelajaran", "pendidikan", "pemahaman"],
  authors: [{ name: "Tim BacaCerdas-AI" }],
  creator: "BacaCerdas-AI",
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${plusJakartaSans.variable} ${lora.variable} antialiased bg-zinc-950 text-zinc-100`}>
        <header className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-10">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.svg" 
              width={32} 
              height={32} 
              alt="BacaCerdas-AI Logo"
              className="h-8 w-auto"
            />
            <span className="font-bold text-lg hidden sm:inline">BacaCerdas-AI</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Auth links - akan diintegrasikan dengan sistem auth baru */}
            <Link 
              href="/sign-in"
              className="text-zinc-300 hover:text-white text-sm px-3 py-2 rounded-md transition-colors"
            >
              Masuk
            </Link>
            <Link 
              href="/sign-up"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition-colors"
            >
              Daftar
            </Link>
          </div>
          </header>
          
          <main>
            {children}
          </main>
          
          {/* <footer className="mt-auto py-8 px-4 border-t border-zinc-800 bg-zinc-900/50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Image 
                  src="/logo.svg" 
                  width={24} 
                  height={24} 
                  alt="BacaCerdas-AI Logo"
                  className="h-6 w-auto"
                />
                <span className="font-medium">BacaCerdas-AI</span>
              </div>
              <div className="text-sm text-zinc-400">
                &copy; {new Date().getFullYear()} BacaCerdas-AI. Hak Cipta Dilindungi.
              </div>
            </div>
          </footer> */}
        </body>
      </html>
  )
}
