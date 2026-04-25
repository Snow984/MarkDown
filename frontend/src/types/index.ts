export interface User {
  id: number
  username: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface Document {
  id: number
  title: string
  folderId: number | null
  userId: number
  createdAt: string
  updatedAt: string
}

export interface DocumentContent {
  id: number
  documentId: number
  content: string
  createdAt: string
}

export interface Folder {
  id: number
  name: string
  parentId: number | null
  userId: number
  createdAt: string
  updatedAt: string
}

export interface DocumentVersion {
  id: number
  documentId: number
  versionNumber: number
  content: string
  createdAt: string
}

export interface ShareLink {
  id: number
  documentId: number
  token: string
  expiresAt: string | null
  canEdit: boolean
  createdAt: string
}

export interface AIAssistResponse {
  suggestion: string
}