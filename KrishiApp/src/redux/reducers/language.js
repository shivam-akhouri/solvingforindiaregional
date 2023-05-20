import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  language: "english"
}

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    update: (state, action) => {
      state.language = action.payload.language
    }
  },
})

// Action creators are generated for each case reducer function
export const { update } = languageSlice.actions

export default languageSlice.reducer