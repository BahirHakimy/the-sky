import React from 'react';
import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  search,
  reset,
  searchLocation,
} from 'redux/features/search/searchSlice';
import { ImSpinner3 } from 'react-icons/im';

function Search() {
  const { query, isLoading, results } = useSelector((store) => store.search);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!query) return;
    dispatch(searchLocation(query));
  }, [dispatch, query]);

  function handleChange(value) {
    if (value === '') {
      dispatch(reset());
    }
    dispatch(search(value));
  }

  return (
    <div className="absolute backdrop-blur-xl z-10 transition-all flex flex-col items-center top-0 left-0 right-0">
      <div className="flex items-center justify-center w-80 pt-2">
        <input
          className="w-auto md:w-max bg-[#2225] text-white rounded-tl-full rounded-bl-full px-3 py-1 placeholder:text-slate-100"
          placeholder="Search for anywhere"
          type="search"
          name="search"
          id="search"
          value={query}
          onChange={({ target: { value } }) => handleChange(value)}
        />
        <label
          htmlFor="search"
          className="bg-[#2225] py-1 px-3 rounded-tr-full rounded-br-full text-white"
        >
          <MdSearch size={25} />
        </label>
      </div>
      <ul className="max-w-[20rem] w-80 px-6 flex-col mt-2 flex items-center justify-center">
        {isLoading && (
          <li className="bg-[#2225] rounded text-white p-2 mb-1 w-full flex justify-center">
            <ImSpinner3 className="animate-spin" size={20} />
          </li>
        )}
        {!isLoading
          && results.map((city) => (
            <li
              key={city.lat}
              className="bg-[#2225] rounded text-white p-2 mb-1 w-full"
            >
              <Link to={`/details/${city.lat}/${city.lon}`}>
                <span className="font-semibold mr-2">{city.name}</span>
                <span className="font-extralight mr-2">{city.state}</span>
                {city.country}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Search;
