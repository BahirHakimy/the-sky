import React from 'react';
import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Home from 'components/Home';
import renderWithProviders from './utils';

describe('Tests for <Home /> component', () => {
  it('should render and display a loading spinner', async () => {
    const screen = renderWithProviders(<Home />);
    expect(screen.getByTestId('loading')).toBeDefined();
    expect(screen.store.getState().location.location).toBeDefined();
  });

  it('should render and display the list of cities', async () => {
    const screen = renderWithProviders(<Home />);
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'), {
      timeout: 10000,
    });
    await waitFor(() => expect(screen.getByTestId('main-card')).toBeDefined());
    expect(screen.getAllByTestId('mini-card').length).toBeGreaterThan(0);
    expect(screen.store.getState().location.location.ip).toBeDefined();
    expect(
      screen.store.getState().weather.citiesWeather.length,
    ).toBeGreaterThan(0);
    expect(
      screen.store.getState().weather.forecast.list.length,
    ).toBeGreaterThan(0);
  });
});
