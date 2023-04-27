import { Link, Navigate, useParams } from 'react-router-dom';
import { CiCalendar, CiClock1, CiLocationOn } from 'react-icons/ci';
import { TbWind } from 'react-icons/tb';
import { WiBarometer, WiHumidity } from 'react-icons/wi';
import { MdChevronLeft, MdOutlineVisibility } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { ImSpinner3 } from 'react-icons/im';

function FullForcast() {
  const { lat, lon } = useParams();
  const {
    isLoading,
    citiesWeather,
    forecast: {
      city: { name },
      list,
    },
  } = useSelector((store) => store.weather);

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

  const data = citiesWeather.filter((ct) => ct.name === name)[0] || list[0];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ImSpinner3 className="text-black animate-spin" size={35} />
      </div>
    );
  }

  if (!isLoading && !data) return <Navigate to={`/details/${lat}/${lon}`} />;

  const groupedData = list.reduce((accu, curr) => {
    const date = new Date(curr.dt * 1000).toDateString();
    if (accu[date]) {
      return { ...accu, [date]: [...accu[date], curr] };
    }
    return { ...accu, [date]: [curr] };
  }, {});

  return (
    <div
      className={`relative bg-cover bg-no-repeat max-h-screen overflow-auto ${getBackground(
        data.weather[0].main,
      )} w-full h-screen m-0`}
    >
      <Link
        to={`/details/${lat}/${lon}`}
        className="absolute top-2 left-2 flex items-center text-sm font-semibold"
      >
        <MdChevronLeft size={20} />
        {' '}
        Back
      </Link>
      <div
        className={`max-w-full flex flex-col col-span-2 items-center p-2 md:p-4 m-2 rounded-md ${
          !['Clear', 'Rain', 'Thunderstorm', 'Snow', 'Clouds'].includes(
            data.weather[0].main,
          ) && 'bg-[#2226]'
        }`}
      >
        <h2 className="text-3xl flex items-center">
          {name}
          {' '}
          Now
          <CiLocationOn size={25} />
        </h2>
        <img
          src={`https://openweathermap.org/img/w/${data?.weather[0].icon}.png`}
          alt="icon"
        />
        <h2 className="text-3xl my-2 capitalize">
          {data.weather[0].description}
        </h2>
        <h2 className="text-3xl my-2">
          {data.main.temp}
          º
        </h2>
        <ul className="flex">
          <li className="flex flex-col items-center mx-2  text-center">
            <TbWind size={25} className="mx-2" />
            {' '}
            {data.wind.speed}
            {' '}
            m/s
          </li>
          <li className="flex flex-col items-center mx-2  text-center">
            <WiHumidity size={25} className="mx-2" />
            {' '}
            {data.main.humidity}
          </li>
          <li className="flex flex-col items-center mx-2  text-center">
            <WiBarometer size={25} className="mx-2" />
            {' '}
            {data.main.pressure}
            {' '}
            hpa
          </li>
          <li className="flex flex-col items-center mx-2  text-center">
            <MdOutlineVisibility size={25} className="mx-2" />
            {' '}
            {data.visibility}
          </li>
        </ul>
      </div>
      <ul className="flex flex-col justify-center items-center w-full my-4 px-4">
        <li>
          <h2 className="text-xl font-semibold">5 Days Forecast</h2>
        </li>
        {Object.keys(groupedData).map((key) => (
          <li
            key={key}
            className="flex flex-col items-start w-full text-white bg-[#2227] shadow backdrop-blur-sm mb-2 p-2"
          >
            <h3 className="flex items-center font-bold">
              <CiCalendar size={18} />
              {' '}
              {key}
            </h3>
            {groupedData[key].map((item) => (
              <div
                key={item.dt}
                className="w-full flex items-center flex-col border-b pt-2"
              >
                <h4 className="text-center flex items-center">
                  <CiClock1 size={18} />
                  {' '}
                  {new Date(item.dt * 1000).toLocaleTimeString()}
                </h4>
                <h2 className="text-2xl flex items-center capitalize">
                  <img
                    src={`https://openweathermap.org/img/w/${item?.weather[0].icon}.png`}
                    alt="icon"
                  />
                  {' '}
                  {item.weather[0].description}
                </h2>
                <h2 className="text-2xl my-2">
                  <span className="text-base font-semibold mx-4">
                    {item.main.temp_min}
                    º
                  </span>
                  {item.main.temp}
                  º
                  <span className="text-base font-semibold mx-4">
                    {item.main.temp_max}
                    º
                  </span>
                </h2>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FullForcast;
