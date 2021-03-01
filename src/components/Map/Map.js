import React from 'react';
import {
  MapContainer as LeafletMap,
  TileLayer,
  useMap,
  Circle,
  Popup,
} from 'react-leaflet';
import './Map.css';

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    mulitiplier: 800,
  },

  recovered: {
    hex: '#7DD71D',
    mulitiplier: 1200,
  },

  deaths: {
    hex: '#C0C0C0',
    mulitiplier: 2000,
  },
};

const showDataOnMap = (countries, type = 'cases') => {
  return countries.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={{
        color: casesTypeColors[type].hex,
        fillColor: casesTypeColors[type].hex,
      }}
      radius={Math.sqrt(country[type] / 10) * casesTypeColors[type].mulitiplier}
    >
      <Popup>
        <div className='info-container'>
          <div
            style={{ background: `url(${country.countryInfo.flag})` }}
            className='info-flag'
          ></div>
          <div className='info-name'>{country.country}</div>
          <div className='info-cases'>Cases: {country.cases}</div>
          <div className='info-recovered'>Recovered: {country.recovered}</div>
          <div className='info-deaths'>Deaths: {country.deaths}</div>
        </div>
      </Popup>
    </Circle>
  ));
};

function Map({ center, zoom, countries, type }) {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className='map'>
      <LeafletMap center={center} zoom={zoom}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {showDataOnMap(countries, type)}
      </LeafletMap>
    </div>
  );
}

export default Map;
