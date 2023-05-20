import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  latitude: 0,
  longitude: 0,
  data: {},
  icon: "cdn.weatherapi.com/weather/64x64/day/114.png",
  temperature_C: 30,
  max_C: 35,
  min_C: 20,
  humidity: 20,
  windSpeed: 10
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    update: (state, action) => {
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
      state.data = action.payload.data
      state.icon = action.payload.icon
      state.temperature_C = action.payload.temperature_C
      state.max_C = action.payload.max_C
      state.min_C = action.payload.min_C
      state.humidity = action.payload.humidity
      state.windSpeed = action.payload.windSpeed
    }
  },
})

// Action creators are generated for each case reducer function
export const { update } = weatherSlice.actions

export default weatherSlice.reducer