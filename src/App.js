import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      //get all the countries data when the component is loaded for the first time
      const response = await fetch('https://disease.sh/v3/covid-19/countries');
      const data = await response.json();

      const trimmedData = data.map((country) => {
        //excluding unwanted info in data
        return {
          name: country.country,
          value: country.countryInfo.iso2,
          id: country.countryInfo._id,
        };
      });

      setCountries(trimmedData);
    };

    getCountriesData();
  }, []);

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__dropdown'>
          <Select variant='outlined'>
            {countries.map((country, index) => {
              return (
                <MenuItem value={country.value} key={index}>
                  {country.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      {/* Title */}
      {/* Select input dropdown field */}

      {/* Infobox */}
      {/* Infobox */}
      {/* Infobox */}

      {/* Map */}

      {/* Table */}
      {/* Graph */}
    </div>
  );
}

export default App;
