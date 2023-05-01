import React from 'react';
import { Link } from 'react-router-dom';

function CardMini({ data }) {
  return (
    <Link
      to={`details/${data.coord.lat}/${data.coord.lon}`}
      className="flex flex-col items-center backdrop-blur bg-[#2228] p-4 m-2 rounded-md max-h-72"
      data-testid="mini-card"
    >
      <h2 className="md:text-2xl text-xl text-white flex items-center">
        {data.name}
      </h2>
      <img
        src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
        alt="icon"
      />

      <h2 className="text-2xl text-white my-2">{data.weather[0].main}</h2>
      <h2 className="text-2xl text-white my-2">
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
    </Link>
  );
}

export default CardMini;
