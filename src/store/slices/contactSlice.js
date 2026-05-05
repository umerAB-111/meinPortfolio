import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'idle',
  error: null,
  formData: {
    name: '',
    email: '',
    message: '',
  },
}

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload }
    },
    submitForm: (state) => {
      state.status = 'loading'
    },
    submitFormSuccess: (state) => {
      state.status = 'success'
      state.formData = { name: '', email: '', message: '' }
    },
    submitFormError: (state, action) => {
      state.status = 'error'
      state.error = action.payload
    },
    resetForm: (state) => {
      state.status = 'idle'
      state.error = null
      state.formData = { name: '', email: '', message: '' }
    },
  },
})

export const {
  updateFormData,
  submitForm,
  submitFormSuccess,
  submitFormError,
  resetForm,
} = contactSlice.actions

export default contactSlice.reducer