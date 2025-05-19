"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/login-form";
import { useAuth } from "@/components/auth/auth-context";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  // Redirect ke halaman utama jika sudah login
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">BacaCerdas AI</h1>
        
        <LoginForm />
        
        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}