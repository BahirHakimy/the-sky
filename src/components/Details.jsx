import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { TbWind } from 'react-icons/tb';
import { WiBarometer, WiHumidity } from 'react-icons/wi';
import { MdOutlineVisibility } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getForecast } from 'redux/features/weather/weatherSlice';
import { ImSpinner3 } from 'react-icons/im';
import BarChart from './BarChart';

function Details() {
  const { city } = useParams();
  const dispatch = useDispatch();
  const {
    isLoading,
    forecast: {
      city: { name },
      list: [data],
    },
  } = useSelector((store) => store.weather);

  useEffect(() => {
    if (!city) return;
    dispatch(getForecast(city));
  }, [city]);

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

  if (isLoading || !data)
    return (
      <div className="flex justify-center items-center h-screen">
        <ImSpinner3 className="text-black animate-spin" size={35} />
      </div>
    );

  return (
    <div
      className={`bg-cover bg-no-repeat max-h-screen overflow-auto ${getBackground(
        // data.weather[0].main
        'Rain'
      )} w-full h-screen m-0`}
    >
      <div
        className={`max-w-full flex flex-col col-span-2 items-center p-2 md:p-4 m-2 rounded-md ${
          data.weather[0].main === 'Drizzle' && 'bg-[#2226]'
        }`}
      >
        <h2 className="text-3xl flex items-center">
          {name} <CiLocationOn size={25} />
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
      </div>
      <BarChart />
    </div>
  );
}

export default Details;
