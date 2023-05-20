import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  n: "",
  p: "",
  k: "",
}

export const NPKSlice = createSlice({
  name: 'NPK',
  initialState,
  reducers: {
    update: (state, action) => {
      state.n = action.payload.n
      state.p = action.payload.p
      state.k = action.payload.k
    }
  },
})

// Action creators are generated for each case reducer function
export const { update2 } = NPKSlice.actions

export default NPKSlice.reducer