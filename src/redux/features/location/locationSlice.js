import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  location: {
    ip: '',
    country: '',
    city: '',
    lat: '',
    lan: '',
  },
  isLoading: false,
  error: false,
};

export const getLocation = createAsyncThunk(
  'location/getLocation',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      return await response.json();
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocation.pending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addCase(
      getLocation.fulfilled,
      (
        state,
        { payload: { ip, country, city, latitude: lat, longitude: lan } }
      ) => {
        return {
          ...state,
          isLoading: false,
          location: { ip, country, city, lat, lan },
        };
      }
    );
    builder.addCase(getLocation.rejected, (state) => ({
      ...state,
      isLoading: false,
      error: 'Failed to get location',
    }));
  },
});

export default locationSlice.reducer;
