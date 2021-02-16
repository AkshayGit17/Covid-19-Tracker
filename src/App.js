import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './components/InfoBox';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

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

  const countryChangedHandler = (event) => {
    event.preventDefault();
    setCountry(event.target.value);
  };

  return (
    <div className='app'>
      {/* Title */}
      {/* Select input dropdown field */}
      <div className='app__header'>
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__dropdown'>
          <Select
            variant='outlined'
            value={country}
            onChange={countryChangedHandler}
          >
            <MenuItem value='worldwide'>Worldwide</MenuItem>
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
      <div className='app__stats'>
        {/* Infobox for Cases*/}
        <InfoBox title='Coronavirus Cases' today={100} total={400} />

        {/* Infobox for Recoveries*/}
        <InfoBox title='Recovered' today={100} total={400} />

        {/* Infobox for Deaths*/}
        <InfoBox title='Deaths' today={100} total={400} />
      </div>

      {/* Map */}

      {/* Table */}
      {/* Graph */}
    </div>
  );
}

export default App;
