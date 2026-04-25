import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Folder } from '../types'
import { foldersApi } from '../api'

interface FoldersState {
  folders: Folder[]
  loading: boolean
  error: string | null
}

const initialState: FoldersState = {
  folders: [],
  loading: false,
  error: null,
}

export const fetchFolders = createAsyncThunk(
  'folders/fetchFolders',
  async (args: { parentId?: number | null } = {}, { rejectWithValue }) => {
    try {
      const folders = await foldersApi.getFolders(args.parentId)
      return folders
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '获取文件夹列表失败')
    }
  }
)

export const createFolder = createAsyncThunk(
  'folders/createFolder',
  async (data: { name: string; parentId?: number | null }, { rejectWithValue }) => {
    try {
      const folder = await foldersApi.createFolder(data)
      return folder
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '创建文件夹失败')
    }
  }
)

export const updateFolder = createAsyncThunk(
  'folders/updateFolder',
  async (data: { id: number; name?: string; parentId?: number | null }, { rejectWithValue }) => {
    try {
      const folder = await foldersApi.updateFolder(data.id, { name: data.name, parentId: data.parentId })
      return folder
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '更新文件夹失败')
    }
  }
)

export const deleteFolder = createAsyncThunk(
  'folders/deleteFolder',
  async (id: number, { rejectWithValue }) => {
    try {
      await foldersApi.deleteFolder(id)
      return id
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '删除文件夹失败')
    }
  }
)

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.loading = false
        state.folders = action.payload
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.folders.push(action.payload)
      })
      .addCase(updateFolder.fulfilled, (state, action) => {
        const index = state.folders.findIndex((f) => f.id === action.payload.id)
        if (index !== -1) {
          state.folders[index] = action.payload
        }
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.folders = state.folders.filter((f) => f.id !== action.payload)
      })
  },
})

export const { clearError } = foldersSlice.actions
export default foldersSlice.reducer
