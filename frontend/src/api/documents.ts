import api from './request'
import type { Document, DocumentContent, DocumentVersion } from '../types'

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
    const response = await api.get<Document[]>('/documents', {
      params: folderId !== undefined ? { folderId } : {},
    })
    return response.data
  },

  getDocument: async (id: number): Promise<Document> => {
    const response = await api.get<Document>(`/documents/${id}`)
    return response.data
  },

  getDocumentContent: async (id: number): Promise<DocumentContent> => {
    const response = await api.get<DocumentContent>(`/documents/${id}/content`)
    return response.data
  },

  createDocument: async (data: CreateDocumentRequest): Promise<Document> => {
    const response = await api.post<Document>('/documents', data)
    return response.data
  },

  updateDocument: async (id: number, data: UpdateDocumentRequest): Promise<Document> => {
    const response = await api.patch<Document>(`/documents/${id}`, data)
    return response.data
  },

  saveDocumentContent: async (id: number, content: string): Promise<DocumentContent> => {
    const response = await api.put<DocumentContent>(`/documents/${id}/content`, { content })
    return response.data
  },

  deleteDocument: async (id: number): Promise<void> => {
    await api.delete(`/documents/${id}`)
  },

  getDocumentVersions: async (id: number): Promise<DocumentVersion[]> => {
    const response = await api.get<DocumentVersion[]>(`/documents/${id}/versions`)
    return response.data
  },

  restoreDocumentVersion: async (id: number, versionId: number): Promise<DocumentContent> => {
    const response = await api.post<DocumentContent>(`/documents/${id}/versions/${versionId}/restore`)
    return response.data
  },
}
