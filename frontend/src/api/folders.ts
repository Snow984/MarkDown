import type { Folder } from '../types'
import { mockFolders } from './mockData'

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
    // 模拟获取文件夹列表
    if (parentId !== undefined) {
      return mockFolders.filter(folder => folder.parentId === parentId)
    }
    return mockFolders
  },

  getFolder: async (id: number): Promise<Folder> => {
    // 模拟获取单个文件夹
    const folder = mockFolders.find(folder => folder.id === id)
    if (!folder) {
      throw new Error('文件夹不存在')
    }
    return folder
  },

  createFolder: async (data: CreateFolderRequest): Promise<Folder> => {
    // 模拟创建文件夹
    const newFolder: Folder = {
      id: mockFolders.length + 1,
      name: data.name,
      parentId: data.parentId || null,
      userId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockFolders.push(newFolder)
    return newFolder
  },

  updateFolder: async (id: number, data: UpdateFolderRequest): Promise<Folder> => {
    // 模拟更新文件夹
    const folder = mockFolders.find(folder => folder.id === id)
    if (!folder) {
      throw new Error('文件夹不存在')
    }
    if (data.name) {
      folder.name = data.name
    }
    if (data.parentId !== undefined) {
      folder.parentId = data.parentId
    }
    folder.updatedAt = new Date().toISOString()
    return folder
  },

  deleteFolder: async (id: number): Promise<void> => {
    // 模拟删除文件夹
    const index = mockFolders.findIndex(folder => folder.id === id)
    if (index !== -1) {
      mockFolders.splice(index, 1)
    }
  }
};
