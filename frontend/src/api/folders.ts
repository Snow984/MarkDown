import api from './request'
import type { Folder } from '../types'
import type { ApiResponse } from './auth'

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
    const response = await api.get<ApiResponse<Folder[]>>('/api/folders', {
      params: parentId !== undefined ? { parentId } : {},
    })
    return response.data.data
  },

  getFolder: async (id: number): Promise<Folder> => {
    const response = await api.get<ApiResponse<Folder>>(`/api/folders/${id}`)
    return response.data.data
  },

  createFolder: async (data: CreateFolderRequest): Promise<Folder> => {
    const response = await api.post<ApiResponse<Folder>>('/api/folders', data)
    return response.data.data
  },

  updateFolder: async (id: number, data: UpdateFolderRequest): Promise<Folder> => {
    const response = await api.patch<ApiResponse<Folder>>(`/api/folders/${id}`, data)
    return response.data.data
  },

  deleteFolder: async (id: number): Promise<void> => {
    await api.delete<ApiResponse<void>>(`/api/folders/${id}`)
  }
};
