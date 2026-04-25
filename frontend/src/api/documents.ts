import api from './request'
import type { Document, DocumentContent, DocumentVersion } from '../types'
import type { ApiResponse } from './auth'

export interface CreateDocumentRequest {
  title: string
  folderId?: number | null
  content?: string
}

export interface UpdateDocumentRequest {
  title?: string
  folderId?: number | null
}

export const documentsApi = {
  getDocuments: async (folderId?: number | null): Promise<Document[]> => {
    const response = await api.get<ApiResponse<Document[]>>('/api/documents', {
      params: folderId !== undefined ? { folderId } : {},
    })
    return response.data.data
  },

  getDocument: async (id: number): Promise<Document> => {
    const response = await api.get<ApiResponse<Document>>(`/api/documents/${id}`)
    return response.data.data
  },

  getDocumentContent: async (id: number): Promise<DocumentContent> => {
    const response = await api.get<ApiResponse<DocumentContent>>(`/api/documents/${id}/content`)
    return response.data.data
  },

  createDocument: async (data: CreateDocumentRequest): Promise<Document> => {
    const response = await api.post<ApiResponse<Document>>('/api/documents', data)
    return response.data.data
  },

  updateDocument: async (id: number, data: UpdateDocumentRequest): Promise<Document> => {
    const response = await api.patch<ApiResponse<Document>>(`/api/documents/${id}`, data)
    return response.data.data
  },

  saveDocumentContent: async (id: number, content: string): Promise<DocumentContent> => {
    const response = await api.put<ApiResponse<DocumentContent>>(`/api/documents/${id}/content`, { content })
    return response.data.data
  },

  deleteDocument: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/api/documents/${id}`)
  },

  getDocumentVersions: async (id: number): Promise<DocumentVersion[]> => {
    const response = await api.get<ApiResponse<DocumentVersion[]>>(`/api/documents/${id}/versions`)
    return response.data.data
  },

  restoreDocumentVersion: async (id: number, versionId: number): Promise<DocumentContent> => {
    const response = await api.post<ApiResponse<DocumentContent>>(`/api/documents/${id}/versions/${versionId}/restore`)
    return response.data.data
  },
}
