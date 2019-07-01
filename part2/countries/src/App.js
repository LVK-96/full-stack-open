import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Components/Search';
import CountryList from './Components/CountryList';

const App = () => {
  const [ countries, setCountries ]  = useState([]);
  const [ countryFilter, setFilter ] = useState('');
  
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      });
  }  

  useEffect(hook, []);
  
  const filteredCountries = countries.filter(country => country.name
                                                        .toLowerCase()
                                                        .includes(countryFilter
                                                                  .toLowerCase()
                                                        ));
  
  return (
    <div>
      <Search countryFilter={countryFilter} setFilter={setFilter} />
      <CountryList countries={filteredCountries} setCountries={setCountries} 
       countryFilter={countryFilter} setFilter={setFilter} />
    </div>
  );
}

export default App;
