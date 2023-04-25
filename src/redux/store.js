import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './features/location/locationSlice';
import weatherReducer from './features/weather/weatherSlice';

export default configureStore({
  reducer: { location: locationReducer, weather: weatherReducer },
});
