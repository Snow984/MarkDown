import api from './request'
import type { ShareLink, Document, DocumentContent } from '../types'
import type { ApiResponse } from './auth'

export interface CreateShareLinkRequest {
  documentId: number
  expiresAt?: string | null
  canEdit?: boolean
}

export const sharesApi = {
  getShareLinks: async (documentId: number): Promise<ShareLink[]> => {
    const response = await api.get<ApiResponse<ShareLink[]>>(`/api/documents/${documentId}/shares`)
    return response.data.data
  },

  createShareLink: async (data: CreateShareLinkRequest): Promise<ShareLink> => {
    const response = await api.post<ApiResponse<ShareLink>>('/api/shares', data)
    return response.data.data
  },

  deleteShareLink: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/api/shares/${id}`)
  },

  getSharedDocument: async (token: string): Promise<{ document: Document; content: DocumentContent; canEdit: boolean }> => {
    const response = await api.get<ApiResponse<{ document: Document; content: DocumentContent; canEdit: boolean }>>(`/api/shares/${token}`)
    return response.data.data
  }
};
