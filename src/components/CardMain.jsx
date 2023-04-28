import React from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { TbWind } from 'react-icons/tb';
import { WiBarometer, WiHumidity } from 'react-icons/wi';
import { MdOutlineVisibility } from 'react-icons/md';
import { Link } from 'react-router-dom';

function CardMain({ city, data }) {
  return (
    <Link
      to={`details/${city.coord.lat}/${city.coord.lon}`}
      className="max-w-full flex flex-col col-span-2 items-center backdrop-blur bg-[#2228] p-2 md:p-4 m-2 rounded-md"
      data-testid="main-card"
    >
      <h2 className="text-3xl text-white flex items-center">
        {city.name}
        {' '}
        <CiLocationOn size={25} />
      </h2>
      <img
        src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
        alt="icon"
      />
      <h2 className="text-3xl text-white my-2">{data.weather[0].main}</h2>
      <h2 className="text-3xl text-white my-2">
        {data.main.temp}
        º
      </h2>
      <div className="flex items-center">
        <span className="text-white font-semibold mx-4">
          {data.main.temp_min}
          º
        </span>
        <span className="text-white font-semibold mx-4">
          {data.main.temp_max}
          º
        </span>
      </div>
      <h3 className="text-white text-center my-2 capitalize">
        {data.weather[0].description}
      </h3>
      <ul className="flex">
        <li className="flex flex-col items-center mx-2 text-white text-center">
          <TbWind size={25} className="mx-2" />
          {' '}
          {data.wind.speed}
          {' '}
          m/s
        </li>
        <li className="flex flex-col items-center mx-2 text-white text-center">
          <WiHumidity size={25} className="mx-2" />
          {' '}
          {data.main.humidity}
        </li>
        <li className="flex flex-col items-center mx-2 text-white text-center">
          <WiBarometer size={25} className="mx-2" />
          {' '}
          {data.main.pressure}
          {' '}
          hpa
        </li>
        <li className="flex flex-col items-center mx-2 text-white text-center">
          <MdOutlineVisibility size={25} className="mx-2" />
          {' '}
          {data.visibility}
        </li>
      </ul>
    </Link>
  );
}

export default CardMain;
