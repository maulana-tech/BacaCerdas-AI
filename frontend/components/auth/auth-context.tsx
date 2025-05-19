"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchWithAuth, postRequest } from "@/lib/api";

type User = {
  id: string;
  name: string;
  email: string;
  token?: string;
  // Tambahkan properti lain sesuai kebutuhan
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Periksa status autentikasi saat komponen dimuat
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        // Validasi token dengan backend
        try {
          const response = await fetchWithAuth('http://localhost:5000/api/auth/validate');
          const userData = await response.json();
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          // Token tidak valid, hapus data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        // Hapus data user jika terjadi error
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Fungsi login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await postRequest('http://localhost:5000/api/auth/login', { email, password });
      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        token: data.token
      };
      
      setUser(userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fungsi register
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await postRequest('http://localhost:5000/api/auth/register', { name, email, password });
      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        token: data.token
      };
      
      setUser(userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fungsi logout
  const logout = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Kirim permintaan logout ke backend
        await postRequest('http://localhost:5000/api/auth/logout', {});
      }
      
      // Hapus data dari localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Tetap hapus data meskipun terjadi error
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}