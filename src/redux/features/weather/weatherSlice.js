import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  citiesWeather: [],
  forecast: {
    city: { name: '' },
    list: [],
  },
  cities: [
    'washington',
    // 'london',
    // 'berlin',
    // 'paris',
    // 'beijing',
    // 'moscow',
    // 'zurich',
    // 'dubai',
    // 'delhi',
    // 'kabul',
    // 'dushanbe',
    // 'tehran',
  ],
};

export const getAllCities = createAsyncThunk(
  'weather/getAllCities',
  async () => {
    const cities = [];
    try {
      await Promise.all(
        initialState.cities.map(async (city) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
          );
          cities.push(await response.json());
        })
      );
      return cities;
    } catch (error) {}
  }
);

export const getForecast = createAsyncThunk(
  'weather/getForecast',
  async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      return await response.json();
    } catch (error) {}
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCities.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getAllCities.fulfilled, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        citiesWeather: [...payload],
      };
    });
    builder.addCase(getAllCities.rejected, (state) => ({
      ...state,
      isLoading: false,
      error: 'Failed to fetch the data',
    }));

    builder.addCase(getForecast.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(getForecast.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      forecast: payload,
    }));
    builder.addCase(getForecast.rejected, (state) => ({
      ...state,
      isLoading: false,
      error: 'Failed to fetch the data',
    }));
  },
});

export default weatherSlice.reducer;
