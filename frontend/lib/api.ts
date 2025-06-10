import axios from 'axios';
import { auth } from '@/auth';

export default class ApiClient {
  get instance() {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return axiosInstance;
  }

  async withAuthServer() {
    const session = await auth();

    const axiosInstanceWithAuth = this.instance;

    axiosInstanceWithAuth.interceptors.request.use(
      (config) => {
        if (session?.user?.token) {
          config.headers['Authorization'] = `Bearer ${session.user.token}`;
          // Baris log ini untuk memastikan header terpasang di log server Anda
          console.log("Memasang header Authorization...");
        } else {
          console.warn("withAuthServer: Sesi atau token tidak ditemukan.");
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return axiosInstanceWithAuth;
  }
}

const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Opsi default untuk fetch
const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
  };

  return fetch(url, mergedOptions);
};

// // Fungsi helper untuk permintaan GET
// export const getRequest = async (url: string): Promise<any> => {
//   const response = await fetchWithAuth(url);

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Terjadi kesalahan saat mengambil data');
//   }

//   return response.json();
// };

// // Fungsi helper untuk permintaan POST
// export const postRequest = async (url: string, data: any): Promise<any> => {
//   const response = await fetchWithAuth(url, {
//     method: 'POST',
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Terjadi kesalahan saat mengirim data');
//   }

//   return response.json();
// };

// // Fungsi helper untuk permintaan PUT
// export const putRequest = async (url: string, data: any): Promise<any> => {
//   const response = await fetchWithAuth(url, {
//     method: 'PUT',
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Terjadi kesalahan saat memperbarui data');
//   }

//   return response.json();
// };

// // Fungsi helper untuk permintaan DELETE
// export const deleteRequest = async (url: string): Promise<any> => {
//   const response = await fetchWithAuth(url, {
//     method: 'DELETE',
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Terjadi kesalahan saat menghapus data');
//   }

//   return response.json();
// };