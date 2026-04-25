import api from './request'
import type { Folder } from '../types'

export interface CreateFolderRequest {
  name: string
  parentId?: number | null
}

export interface UpdateFolderRequest {
  name?: string
  parentId?: number | null
}

export const foldersApi = {
  getFolders: async (parentId?: number | null): Promise<Folder[]> => {
    const response = await api.get<Folder[]>('/folders', {
      params: parentId !== undefined ? { parentId } : {},
    })
    return response.data
  },

  getFolder: async (id: number): Promise<Folder> => {
    const response = await api.get<Folder>(`/folders/${id}`)
    return response.data
  },

  createFolder: async (data: CreateFolderRequest): Promise<Folder> => {
    const response = await api.post<Folder>('/folders', data)
    return response.data
  },

  updateFolder: async (id: number, data: UpdateFolderRequest): Promise<Folder> => {
    const response = await api.patch<Folder>(`/folders/${id}`, data)
    return response.data
  },

  deleteFolder: async (id: number): Promise<void> => {
    await api.delete(`/folders/${id}`)
  },
}
