"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validasi dasar
    if (!formData.email || !formData.password) {
      setError("Email dan password harus diisi");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Implementasi login akan ditambahkan di sini
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     password: formData.password
      //   })
      // });
      
      // if (!response.ok) {
      //   const data = await response.json();
      //   throw new Error(data.message || 'Email atau password salah');
      // }
      
      // Redirect ke dashboard setelah berhasil login
      // router.push('/dashboard');
      
      // Sementara hanya simulasi
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat login");
      setIsLoading(false);
    }
  };

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
        <h1 className="text-3xl font-bold tracking-tight text-white">Selamat Datang Kembali</h1>
        <p className="text-zinc-400">Masuk ke akun BacaCerdas-AI Anda</p>
      </div>

      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm shadow-xl transition-all duration-200">
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-500/20 border border-rose-500/50 rounded-md text-rose-300 text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-800/50 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-zinc-400">
                    Ingat saya
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link href="/forgot-password" className="text-blue-500 hover:text-blue-400 transition-colors">
                    Lupa password?
                  </Link>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Masuk..." : "Masuk"}
              </button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-zinc-900/50 text-zinc-500">atau</span>
                </div>
              </div>
              
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Masuk dengan Google
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-zinc-500">
          <p>
            Belum memiliki akun?{" "}
            <Link 
              href="/sign-up" 
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              Daftar
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