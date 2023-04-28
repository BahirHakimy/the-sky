import locationReducer, {
  getLocation,
} from 'redux/features/location/locationSlice';

describe('Tests for locationSlice', () => {
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
  it('Should have the correct initial state', () => {
    expect(locationReducer(undefined, {})).toEqual(initialState);
  });

  it('Should handle the fullfiled case correctly', () => {
    const response = {
      ip: 'test',
      country: 'test',
      city: 'test',
      latitude: 'test',
      longitude: 'test',
    };
    const location = {
      ip: 'test',
      country: 'test',
      city: 'test',
      lat: 'test',
      lan: 'test',
    };

    expect(
      locationReducer(initialState, getLocation.pending()).isLoading,
    ).toBeTruthy();

    const newState = locationReducer(
      initialState,
      getLocation.fulfilled(response),
    );

    expect(newState.isLoading).toBeFalsy();
    expect(newState.location).toEqual(location);
  });

  it('Should handle the rejected case correctly', () => {
    const newState = locationReducer(
      initialState,
      getLocation.rejected(new Error('Failed to fetch')),
    );

    expect(newState.isLoading).toBeFalsy();
    expect(newState.error).toBeDefined();
  });
});
