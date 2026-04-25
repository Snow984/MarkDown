import api from './request'
import type { User } from '../types'

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/login', data)
    return response.data.data
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/api/auth/register', data)
    return response.data.data
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/api/auth/me')
    return response.data.data
  },

  logout: async (): Promise<void> => {
    await api.post<ApiResponse<void>>('/api/auth/logout')
  },

  updateProfile: async (data: Partial<{ username: string; email: string }>): Promise<User> => {
    const response = await api.patch<ApiResponse<User>>('/api/auth/profile', data)
    return response.data.data
  },

  changePassword: async (data: { oldPassword: string; newPassword: string }): Promise<void> => {
    await api.post<ApiResponse<void>>('/api/auth/change-password', data)
  }
};
