import api from './request'
import type { ShareLink, Document, DocumentContent } from '../types'

export interface CreateShareLinkRequest {
  documentId: number
  expiresAt?: string | null
  canEdit?: boolean
}

export const sharesApi = {
  getShareLinks: async (documentId: number): Promise<ShareLink[]> => {
    const response = await api.get<ShareLink[]>(`/documents/${documentId}/shares`)
    return response.data
  },

  createShareLink: async (data: CreateShareLinkRequest): Promise<ShareLink> => {
    const response = await api.post<ShareLink>('/shares', data)
    return response.data
  },

  deleteShareLink: async (id: number): Promise<void> => {
    await api.delete(`/shares/${id}`)
  },

  getSharedDocument: async (token: string): Promise<{ document: Document; content: DocumentContent; canEdit: boolean }> => {
    const response = await api.get(`/shares/${token}`)
    return response.data
  },
}
