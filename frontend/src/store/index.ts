import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import documentsReducer from './documentsSlice'
import foldersReducer from './foldersSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    documents: documentsReducer,
    folders: foldersReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
