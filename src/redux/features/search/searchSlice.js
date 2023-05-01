import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  query: '',
  results: [],
};

export const searchLocation = createAsyncThunk(
  'search/searchLocation',
  async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      return await response.json();
    } catch (error) {
      return error;
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    search: (state, { payload }) => ({ ...state, query: payload }),
    reset: (state) => ({ ...state, results: [] }),
  },
  extraReducers: (builder) => {
    builder.addCase(searchLocation.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(searchLocation.fulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      results: payload.map((city) => ({
        name: city.name,
        country: city.country,
        state: city.state,
        lat: city.lat,
        lon: city.lon,
      })),
    }));
    builder.addCase(searchLocation.rejected, (state) => ({
      ...state,
      isLoading: false,
      error: 'Failed to fetch the data',
    }));
  },
});

export const { search, reset } = searchSlice.actions;
export default searchSlice.reducer;
