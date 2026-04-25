import api from './request'
import type { ApiResponse } from './auth'

export interface AIAssistRequest {
  prompt: string
  context?: string
}

export interface AIAssistResponse {
  suggestion: string
}

export const aiApi = {
  generateContent: async (data: AIAssistRequest): Promise<AIAssistResponse> => {
    const response = await api.post<ApiResponse<string>>('/api/ai/generate', data)
    return { suggestion: response.data.data }
  },

  improveContent: async (data: AIAssistRequest): Promise<AIAssistResponse> => {
    const response = await api.post<ApiResponse<string>>('/api/ai/improve', data)
    return { suggestion: response.data.data }
  },

  summarizeContent: async (data: AIAssistRequest): Promise<AIAssistResponse> => {
    const response = await api.post<ApiResponse<string>>('/api/ai/summarize', data)
    return { suggestion: response.data.data }
  }
};
