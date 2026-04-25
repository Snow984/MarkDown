import { createSlice } from '@reduxjs/toolkit'

interface UIState {
  sidebarCollapsed: boolean
  aiAssistantOpen: boolean
  theme: 'light' | 'dark'
}

const initialState: UIState = {
  sidebarCollapsed: false,
  aiAssistantOpen: false,
  theme: 'light',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    toggleAIAssistant: (state) => {
      state.aiAssistantOpen = !state.aiAssistantOpen
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const { toggleSidebar, toggleAIAssistant, setTheme } = uiSlice.actions
export default uiSlice.reducer
