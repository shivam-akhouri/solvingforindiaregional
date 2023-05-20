import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  model1: "Loading...",
  model2: "Loading...",
  model3: "Loading...",
}

export const MachineLearningSlice = createSlice({
  name: 'Models',
  initialState,
  reducers: {
    update: (state, action) => {
      state.model1 = action.payload.model1
      state.model2 = action.payload.model2
      state.model3 = action.payload.model3
    }
  },
})

// Action creators are generated for each case reducer function
export const { update } = MachineLearningSlice.actions

export default MachineLearningSlice.reducer