import { configureStore } from '@reduxjs/toolkit'
import { weatherSlice } from './reducers/weather'
import language, { languageSlice } from './reducers/language'
import { MachineLearningSlice } from './reducers/crop'
import { NPKSlice } from './reducers/npk'

export const store = configureStore({
  reducer:{
    ml: MachineLearningSlice.reducer,
    weather: weatherSlice.reducer,
    language: languageSlice.reducer,
    npk: NPKSlice.reducer
  }
})