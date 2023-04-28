import weatherReducer, {
  getAllCities,
  getForecast,
} from 'redux/features/weather/weatherSlice';

describe('Tests for locationSlice', () => {
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
      'london',
      'berlin',
      'paris',
      'beijing',
      'moscow',
      'zurich',
      'dubai',
      'delhi',
      'kabul',
      'dushanbe',
      'tehran',
    ],
  };

  it('Should have the correct initial state', () => {
    expect(weatherReducer(undefined, {})).toEqual(initialState);
  });

  it('Should handle getAllCities fullfiled case correctly', () => {
    const response = [{ name: 'city1' }, { name: 'city2' }];

    expect(
      weatherReducer(initialState, getAllCities.pending()).isLoading,
    ).toBeTruthy();

    const newState = weatherReducer(
      initialState,
      getAllCities.fulfilled(response),
    );

    expect(newState.isLoading).toBeFalsy();
    expect(newState.citiesWeather).toEqual(response);
  });

  it('Should handle getAllCities rejected case correctly', () => {
    const newState = weatherReducer(
      initialState,
      getAllCities.rejected(new Error('Failed to fetch')),
    );

    expect(newState.isLoading).toBeFalsy();
    expect(newState.error).toBeDefined();
  });

  it('Should handle getForecast fullfiled case correctly', () => {
    const response = [{ name: 'city1' }, { name: 'city2' }];

    expect(
      weatherReducer(initialState, getForecast.pending()).isLoading,
    ).toBeTruthy();

    const newState = weatherReducer(
      initialState,
      getForecast.fulfilled(response),
    );

    expect(newState.isLoading).toBeFalsy();
    expect(newState.forecast).toEqual(response);
  });

  it('Should handle getForecast rejected case correctly', () => {
    const newState = weatherReducer(
      initialState,
      getForecast.rejected(new Error('Failed to fetch')),
    );

    expect(newState.isLoading).toBeFalsy();
    expect(newState.error).toBeDefined();
  });
});
