import type { Document, DocumentContent, DocumentVersion } from '../types'
import { mockDocuments, mockDocumentContents, mockDocumentVersions } from './mockData'

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
    // 模拟获取文档列表
    if (folderId !== undefined) {
      return mockDocuments.filter(doc => doc.folderId === folderId)
    }
    return mockDocuments
  },

  getDocument: async (id: number): Promise<Document> => {
    // 模拟获取单个文档
    const document = mockDocuments.find(doc => doc.id === id)
    if (!document) {
      throw new Error('文档不存在')
    }
    return document
  },

  getDocumentContent: async (id: number): Promise<DocumentContent> => {
    // 模拟获取文档内容
    const content = mockDocumentContents[id]
    if (!content) {
      throw new Error('文档内容不存在')
    }
    return content
  },

  createDocument: async (data: CreateDocumentRequest): Promise<Document> => {
    // 模拟创建文档
    const newDocument: Document = {
      id: mockDocuments.length + 1,
      title: data.title,
      folderId: data.folderId || null,
      userId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockDocuments.push(newDocument)
    return newDocument
  },

  updateDocument: async (id: number, data: UpdateDocumentRequest): Promise<Document> => {
    // 模拟更新文档
    const document = mockDocuments.find(doc => doc.id === id)
    if (!document) {
      throw new Error('文档不存在')
    }
    if (data.title) {
      document.title = data.title
    }
    if (data.folderId !== undefined) {
      document.folderId = data.folderId
    }
    document.updatedAt = new Date().toISOString()
    return document
  },

  saveDocumentContent: async (id: number, content: string): Promise<DocumentContent> => {
    // 模拟保存文档内容
    const existingContent = mockDocumentContents[id]
    if (existingContent) {
      existingContent.content = content
      return existingContent
    } else {
      const newContent: DocumentContent = {
        id: Object.keys(mockDocumentContents).length + 1,
        documentId: id,
        content,
        createdAt: new Date().toISOString()
      }
      mockDocumentContents[id] = newContent
      return newContent
    }
  },

  deleteDocument: async (id: number): Promise<void> => {
    // 模拟删除文档
    const index = mockDocuments.findIndex(doc => doc.id === id)
    if (index !== -1) {
      mockDocuments.splice(index, 1)
    }
  },

  getDocumentVersions: async (id: number): Promise<DocumentVersion[]> => {
    // 模拟获取文档版本
    return mockDocumentVersions[id] || []
  },

  restoreDocumentVersion: async (id: number, versionId: number): Promise<DocumentContent> => {
    // 模拟恢复文档版本
    const versions = mockDocumentVersions[id]
    if (!versions) {
      throw new Error('版本不存在')
    }
    const version = versions.find(v => v.id === versionId)
    if (!version) {
      throw new Error('版本不存在')
    }
    return {
      id: mockDocumentContents[id]?.id || Object.keys(mockDocumentContents).length + 1,
      documentId: id,
      content: version.content,
      createdAt: new Date().toISOString()
    }
  }
};
