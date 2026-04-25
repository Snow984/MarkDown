import type { ShareLink, Document, DocumentContent } from '../types'
import { mockShareLinks, mockDocuments, mockDocumentContents } from './mockData'

export interface CreateShareLinkRequest {
  documentId: number
  expiresAt?: string | null
  canEdit?: boolean
}

export const sharesApi = {
  getShareLinks: async (documentId: number): Promise<ShareLink[]> => {
    // 模拟获取分享链接列表
    return mockShareLinks[documentId] || []
  },

  createShareLink: async (data: CreateShareLinkRequest): Promise<ShareLink> => {
    // 模拟创建分享链接
    const newShareLink: ShareLink = {
      id: Object.keys(mockShareLinks).length + 1,
      documentId: data.documentId,
      token: `mock-token-${Math.random().toString(36).substr(2, 9)}`,
      expiresAt: data.expiresAt || null,
      canEdit: data.canEdit || false,
      createdAt: new Date().toISOString()
    }
    if (!mockShareLinks[data.documentId]) {
      mockShareLinks[data.documentId] = []
    }
    mockShareLinks[data.documentId].push(newShareLink)
    return newShareLink
  },

  deleteShareLink: async (id: number): Promise<void> => {
    // 模拟删除分享链接
    for (const documentId in mockShareLinks) {
      const links = mockShareLinks[parseInt(documentId)]
      const index = links.findIndex(link => link.id === id)
      if (index !== -1) {
        links.splice(index, 1)
        break
      }
    }
  },

  getSharedDocument: async (token: string): Promise<{ document: Document; content: DocumentContent; canEdit: boolean }> => {
    // 模拟获取共享文档
    let foundLink: ShareLink | undefined
    for (const documentId in mockShareLinks) {
      const links = mockShareLinks[parseInt(documentId)]
      foundLink = links.find(link => link.token === token)
      if (foundLink) {
        break
      }
    }
    if (!foundLink) {
      throw new Error('分享链接不存在')
    }
    const document = mockDocuments.find(doc => doc.id === foundLink.documentId)
    const content = mockDocumentContents[foundLink.documentId]
    if (!document || !content) {
      throw new Error('文档不存在')
    }
    return {
      document,
      content,
      canEdit: foundLink.canEdit
    }
  },
};
