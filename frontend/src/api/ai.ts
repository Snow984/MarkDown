import api from './request'

export interface AIAssistRequest {
  prompt: string
  context?: string
}

export interface AIAssistResponse {
  suggestion: string
}

export const aiApi = {
  generateContent: async (data: AIAssistRequest): Promise<AIAssistResponse> => {
    const response = await api.post<AIAssistResponse>('/ai/generate', data)
    return response.data
  },

  improveContent: async (data: AIAssistRequest): Promise<AIAssistResponse> => {
    const response = await api.post<AIAssistResponse>('/ai/improve', data)
    return response.data
  },

  summarizeContent: async (data: AIAssistRequest): Promise<AIAssistResponse> => {
    const response = await api.post<AIAssistResponse>('/ai/summarize', data)
    return response.data
  },
}
