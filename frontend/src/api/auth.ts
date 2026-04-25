import type { User } from '../types'
import { mockUser } from './mockData'

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  nickname?: string
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
  login: async (_data: LoginRequest): Promise<AuthResponse> => {
    // 模拟登录成功
    return {
      token: 'mock-token-123',
      user: mockUser
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    // 模拟注册成功
    return {
      token: 'mock-token-123',
      user: {
        ...mockUser,
        username: data.username,
        email: data.email
      }
    }
  },

  getMe: async (): Promise<User> => {
    // 模拟获取当前用户信息
    return mockUser
  },

  logout: async (): Promise<void> => {
    // 模拟登出
    return Promise.resolve()
  },

  updateProfile: async (data: Partial<{ username: string; email: string }>): Promise<User> => {
    // 模拟更新个人信息
    return {
      ...mockUser,
      ...data
    }
  },

  changePassword: async (_data: { oldPassword: string; newPassword: string }): Promise<void> => {
    // 模拟修改密码
    return Promise.resolve()
  }
};
