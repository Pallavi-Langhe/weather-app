import { useState, useEffect } from "react";
import Select from "react-select";
import { geoApiOptions, GEO_API_URL } from "../../api";
import customDebounce from "../../utils/customDebounce";

// eslint-disable-next-line react/prop-types
const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedLoadOptions = customDebounce(loadOptions, 600);

  function loadOptions(inputValue) {
    setIsLoading(true);

    fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        const newOptions = response?.data?.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        }));

        setOptions(newOptions);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setIsLoading(false));
  }

  const handleOnChange = (selectedOption) => {
    setSearch(selectedOption);
    onSearchChange(selectedOption);
  };

  const handleInputChange = (inputValue) => {
    setSearch(null);
    debouncedLoadOptions(inputValue);
  };

  useEffect(() => {
    return () => {
      debouncedLoadOptions.cancel();
    };
  }, [debouncedLoadOptions]);

  return (
    <Select
      placeholder="Search for city"
      isClearable
      isLoading={isLoading}
      value={search}
      onChange={handleOnChange}
      onInputChange={handleInputChange}
      options={options}
    />
  );
};

export default Search;

