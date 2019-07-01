import React from 'react';
import CountryBasicInfo from './CountryBasicInfo';
import Languages from './Languages';
import Weather from './Weather';

const Country = ({ country }) => {
  const altstr = country.name.concat(' flag');
  
  return (
    <>
      <h1>{country.name}</h1>
      <CountryBasicInfo capital={country.capital} 
       population={country.population} />
      <h1>languages</h1>
      <Languages languages={country.languages} />
      <div>
        <img src={country.flag} alt={altstr} style={{height: 200}} />
      </div>
      <h1>Weather in {country.capital}</h1>
      <Weather capital={country.capital}/>
    </>
  );
}

export default Country