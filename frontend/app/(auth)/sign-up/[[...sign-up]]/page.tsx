"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Menangani loading state
  const handleStart = () => setIsLoading(true);
  const handleComplete = () => setIsLoading(false);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950 px-4 py-12">
      <div className="flex flex-col items-center mb-8 space-y-2">
        <Link href="/" className="mb-6">
          <Image 
            src="/logo.svg" 
            width={120} 
            height={40} 
            alt="BacaCerdas-AI Logo"
            className="h-10 w-auto"
            priority
          />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white">Bergabung dengan BacaCerdas-AI</h1>
        <p className="text-zinc-400">Buat akun Anda untuk memulai</p>
      </div>

      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm shadow-xl transition-all duration-200">
          {/* Custom wrapper around Clerk's SignUp component */}
          <div className="px-6 py-8">
            <SignUp 
              appearance={{
                baseTheme: dark,
                elements: {
                  formButtonPrimary: 
                    "bg-blue-600 hover:bg-blue-700 text-sm normal-case transition-all duration-200",
                  formFieldInput: 
                    "bg-zinc-800/50 border-zinc-700 text-white",
                  formFieldLabel: "text-zinc-300",
                  card: "bg-transparent shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  dividerLine: "bg-zinc-700",
                  dividerText: "text-zinc-500",
                  socialButtonsBlockButton: 
                    "border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition-all duration-200",
                  socialButtonsBlockButtonText: "text-zinc-300",
                  footerActionLink: "text-blue-500 hover:text-blue-400",
                  formFieldWarningText: "text-amber-500",
                  formFieldErrorText: "text-rose-500",
                }
              }}
              routing="path"
              path="/sign-up"
              redirectUrl="/dashboard"
              signInUrl="/sign-in"
            />
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-zinc-500">
          <p>
            Sudah memiliki akun?{" "}
            <Link 
              href="/sign-in" 
              className="text-blue-500 hover:text-blue-400 transition-colors"
              onClick={handleStart}
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  );
}

