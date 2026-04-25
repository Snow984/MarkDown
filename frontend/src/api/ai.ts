import type { AIAssistResponse } from '../types'
import { mockAIResponse } from './mockData'

export interface AIAssistRequest {
  prompt: string
  context?: string
}

export const aiApi = {
  generateContent: async (_data: AIAssistRequest): Promise<AIAssistResponse> => {
    // 模拟AI生成内容
    return mockAIResponse
  },

  improveContent: async (_data: AIAssistRequest): Promise<AIAssistResponse> => {
    // 模拟AI改进内容
    return mockAIResponse
  },

  summarizeContent: async (_data: AIAssistRequest): Promise<AIAssistResponse> => {
    // 模拟AI总结内容
    return mockAIResponse
  },
};
