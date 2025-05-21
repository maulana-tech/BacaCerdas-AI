import type { Metadata, Viewport } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
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
      <body className={`${plusJakartaSans.variable} ${lora.variable} antialiased bg-white text-zinc-900`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
