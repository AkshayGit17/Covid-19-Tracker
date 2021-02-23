import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './components/InfoBox/InfoBox';
import Map from './components/Map/Map';
import Table from './components/Table/Table';
import { sortData } from './util';
import LineGraph from './components/LineGraph/LineGraph';

function App() {
  const [countries, setCountries] = useState([]); //used to hold all the countries to populate in the dropdown
  const [country, setCountry] = useState('worldwide'); //used to hold the selected country
  const [countryInfo, setCountryInfo] = useState({}); //used to hold the selected country info
  const [tableData, setTableData] = useState([]); //used to hold all the countries to populate in the table

  console.log(countryInfo);

  useEffect(() => {
    const getWorldwideInfo = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/all');
      const data = await response.json();
      setCountryInfo(data);
    };
    getWorldwideInfo(); //load worldwide info when the component is loaded for the first time
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
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

      setTableData(sortData(data, 'cases', 'DESC'));
      setCountries(trimmedData);
    };

    getCountriesData(); //get all the countries data when the component is loaded for the first time
  }, []);

  const countryChangedHandler = async (event) => {
    event.preventDefault();

    const countryName = event.target.value;

    const url =
      countryName === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryName}`;

    const response = await fetch(url); //on every selection get the country info
    const data = await response.json();

    setCountry(countryName);
    setCountryInfo(data);
  };

  return (
    <div className='app'>
      <div className='app__left'>
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
          <InfoBox
            title='Coronavirus Cases'
            today={countryInfo.todayCases}
            total={countryInfo.cases}
          />

          {/* Infobox for Recoveries*/}
          <InfoBox
            title='Recovered'
            today={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          {/* Infobox for Deaths*/}
          <InfoBox
            title='Deaths'
            today={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className='app__right'>
        <CardContent>
          {/* Table */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          {/* Graph */}
          <h3>WorldWide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
