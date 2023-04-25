import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from 'redux/features/location/locationSlice';
import { getAllCities, getForecast } from 'redux/features/weather/weatherSlice';
import { ImSpinner3 } from 'react-icons/im';
import CardMini from './CardMini';
import CardMain from './CardMain';

function Home() {
  const dispatch = useDispatch();
  const {
    location: {
      location: { city },
    },
    weather,
    isLoading,
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getLocation());
    if (weather.forecast && weather.forecast.list?.length > 0) return;
    dispatch(getAllCities());
  }, []);

  useEffect(() => {
    if (!city) return;
    dispatch(getForecast(city));
  }, [city]);

  return (
    <div className="grid grid-cols-2 h-screen max-h-screen overflow-auto bg-cover bg-[url('assets/bg.jpg')]">
      {isLoading && (
        <ImSpinner3 className="text-white animate-spin" size={25} />
      )}

      {weather.forecast.list?.length > 0 && (
        <CardMain
          name={weather.forecast.city?.name}
          data={weather.forecast.list[0]}
        />
      )}
      {weather.citiesWeather.map((city) => {
        return city.name === weather.forecast.city?.name ? null : (
          <CardMini key={city.id} data={city} />
        );
      })}
    </div>
  );
}

export default Home;
