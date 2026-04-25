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

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data)
    return response.data
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me')
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  updateProfile: async (data: Partial<{ username: string; email: string }>): Promise<User> => {
    const response = await api.patch<User>('/auth/profile', data)
    return response.data
  },

  changePassword: async (data: { oldPassword: string; newPassword: string }): Promise<void> => {
    await api.post('/auth/change-password', data)
  },
}
