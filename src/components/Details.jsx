import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { TbWind } from 'react-icons/tb';
import { WiBarometer, WiHumidity } from 'react-icons/wi';
import { MdChevronLeft, MdOutlineVisibility } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getForecast } from 'redux/features/weather/weatherSlice';
import { ImSpinner3 } from 'react-icons/im';
import BarChart from './BarChart';

function Details() {
  const { lat, lon } = useParams();
  const dispatch = useDispatch();
  const {
    isLoading,
    citiesWeather,
    forecast: { city, list },
  } = useSelector((store) => store.weather);

  useEffect(() => {
    if (!lat || !lon) return;
    dispatch(getForecast({ lat, lon }));
  }, [lat, lon]);

  function getBackground(weather) {
    switch (weather) {
      case 'Clear':
        return "bg-[url('assets/clear.jpg')] text-slate-800";
      case 'Rain':
        return "bg-[url('assets/rain-mob.jpg')] text-slate-50";
      case 'Snow':
        return "bg-[url('assets/snow.jpg')] text-slate-50";
      case 'Drizzle':
        return "bg-[url('assets/drizzle.jpg')] text-slate-50";
      case 'Thunderstorm':
        return "bg-[url('assets/thunderstorm.jpg')] text-slate-50";
      case 'Clouds':
        return "bg-[url('assets/clouds.jpg')] text-slate-800 ";
      default:
        return "bg-[url('assets/drizzle.jpg')] text-slate-50";
    }
  }

  const data =
    citiesWeather.filter((ct) => ct.name === city.name)[0] || list[0];

  if (isLoading || !data)
    return (
      <div className="flex justify-center items-center h-screen">
        <ImSpinner3 className="text-black animate-spin" size={35} />
      </div>
    );

  return (
    <div
      className={`relative bg-cover bg-no-repeat max-h-screen overflow-auto ${getBackground(
        data.weather[0].main
      )} w-full h-screen m-0`}
    >
      <Link
        to="/"
        className="absolute top-2 left-2 flex items-center text-sm font-semibold"
      >
        <MdChevronLeft size={20} /> Back
      </Link>
      <div
        className={`max-w-full flex flex-col col-span-2 items-center p-2 md:p-4 m-2 rounded-md ${
          !['Clear', 'Rain', 'Thunderstorm', 'Snow', 'Clouds'].includes(
            data.weather[0].main
          ) && 'bg-[#2226]'
        }`}
      >
        <h2 className="text-3xl flex items-center">
          {city.name} <CiLocationOn size={25} />
        </h2>
        <img
          src={`https://openweathermap.org/img/w/${data?.weather[0].icon}.png`}
          alt="icon"
        />
        <h2 className="text-3xl my-2">{data.weather[0].main}</h2>
        <h2 className="text-3xl my-2">{data.main.temp}º</h2>
        <div className="flex items-center">
          <span className=" font-semibold mx-4">{data.main.temp_min}º</span>
          <span className=" font-semibold mx-4">{data.main.temp_max}º</span>
        </div>
        <h3 className=" text-center my-2 capitalize">
          {data.weather[0].description}
        </h3>
        <ul className="flex">
          <li className="flex flex-col items-center mx-2  text-center">
            <TbWind size={25} className="mx-2" /> {data.wind.speed} m/s
          </li>
          <li className="flex flex-col items-center mx-2  text-center">
            <WiHumidity size={25} className="mx-2" /> {data.main.humidity}
          </li>
          <li className="flex flex-col items-center mx-2  text-center">
            <WiBarometer size={25} className="mx-2" /> {data.main.pressure} hpa
          </li>
          <li className="flex flex-col items-center mx-2  text-center">
            <MdOutlineVisibility size={25} className="mx-2" /> {data.visibility}
          </li>
        </ul>
        <Link
          to={`/forecast/${lat}/${lon}`}
          className="bg-[#2226] text-white px-2 py-1 mt-1 rounded-full"
        >
          See Full Forecast
        </Link>
      </div>
      <BarChart color="#fff" list={list.slice(0, 8)} />
    </div>
  );
}

export default Details;
