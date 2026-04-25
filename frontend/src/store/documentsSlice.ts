import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Document, DocumentContent, DocumentVersion } from '../types'
import { documentsApi } from '../api'

interface DocumentsState {
  documents: Document[]
  currentDocument: Document | null
  currentContent: DocumentContent | null
  versions: DocumentVersion[]
  loading: boolean
  error: string | null
  saving: boolean
}

const initialState: DocumentsState = {
  documents: [],
  currentDocument: null,
  currentContent: null,
  versions: [],
  loading: false,
  error: null,
  saving: false,
}

export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async (args: { folderId?: number | null } = {}, { rejectWithValue }) => {
    try {
      const documents = await documentsApi.getDocuments(args.folderId)
      return documents
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '获取文档列表失败')
    }
  }
)

export const fetchDocument = createAsyncThunk(
  'documents/fetchDocument',
  async (id: number, { rejectWithValue }) => {
    try {
      const document = await documentsApi.getDocument(id)
      return document
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '获取文档失败')
    }
  }
)

export const fetchDocumentContent = createAsyncThunk(
  'documents/fetchDocumentContent',
  async (id: number, { rejectWithValue }) => {
    try {
      const content = await documentsApi.getDocumentContent(id)
      return content
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '获取文档内容失败')
    }
  }
)

export const createDocument = createAsyncThunk(
  'documents/createDocument',
  async (data: { title: string; folderId?: number | null; content?: string }, { rejectWithValue }) => {
    try {
      const document = await documentsApi.createDocument(data)
      return document
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '创建文档失败')
    }
  }
)

export const updateDocument = createAsyncThunk(
  'documents/updateDocument',
  async (data: { id: number; title?: string; folderId?: number | null }, { rejectWithValue }) => {
    try {
      const document = await documentsApi.updateDocument(data.id, { title: data.title, folderId: data.folderId })
      return document
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '更新文档失败')
    }
  }
)

export const saveDocumentContent = createAsyncThunk(
  'documents/saveDocumentContent',
  async (data: { id: number; content: string }, { rejectWithValue }) => {
    try {
      const content = await documentsApi.saveDocumentContent(data.id, data.content)
      return content
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '保存文档失败')
    }
  }
)

export const deleteDocument = createAsyncThunk(
  'documents/deleteDocument',
  async (id: number, { rejectWithValue }) => {
    try {
      await documentsApi.deleteDocument(id)
      return id
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '删除文档失败')
    }
  }
)

export const fetchDocumentVersions = createAsyncThunk(
  'documents/fetchDocumentVersions',
  async (id: number, { rejectWithValue }) => {
    try {
      const versions = await documentsApi.getDocumentVersions(id)
      return versions
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '获取版本历史失败')
    }
  }
)

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCurrentContent: (state, action) => {
      if (state.currentContent) {
        state.currentContent.content = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false
        state.documents = action.payload
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchDocument.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDocument.fulfilled, (state, action) => {
        state.loading = false
        state.currentDocument = action.payload
      })
      .addCase(fetchDocument.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchDocumentContent.fulfilled, (state, action) => {
        state.currentContent = action.payload
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.documents.unshift(action.payload)
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        const index = state.documents.findIndex((d) => d.id === action.payload.id)
        if (index !== -1) {
          state.documents[index] = action.payload
        }
        if (state.currentDocument?.id === action.payload.id) {
          state.currentDocument = action.payload
        }
      })
      .addCase(saveDocumentContent.pending, (state) => {
        state.saving = true
      })
      .addCase(saveDocumentContent.fulfilled, (state, action) => {
        state.saving = false
        state.currentContent = action.payload
      })
      .addCase(saveDocumentContent.rejected, (state) => {
        state.saving = false
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.documents = state.documents.filter((d) => d.id !== action.payload)
      })
      .addCase(fetchDocumentVersions.fulfilled, (state, action) => {
        state.versions = action.payload
      })
  },
})

export const { clearError, setCurrentContent } = documentsSlice.actions
export default documentsSlice.reducer
