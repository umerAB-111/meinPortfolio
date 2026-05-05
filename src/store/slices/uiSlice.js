import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'dark',
  mobileMenuOpen: false,
  activeSection: 'hero',
  isLoading: true,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload
    },
    setActiveSection: (state, action) => {
      state.activeSection = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  toggleTheme,
  setTheme,
  toggleMobileMenu,
  setMobileMenuOpen,
  setActiveSection,
  setIsLoading,
} = uiSlice.actions

export default uiSlice.reducer