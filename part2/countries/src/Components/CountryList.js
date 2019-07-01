import React from 'react';
import Country from './Country';
import CountryName from './CountryName';

const CountryList = ({ countries, setFilter }) => {
  let ret; 
  if (countries.length === 1) {
    ret = <Country country={countries[0]} />
  } else if (countries.length < 11) {
    ret = countries.map(country => <CountryName key={country.alpha3Code} 
                                    name={country.name} setFilter={setFilter}/>);
  } else {
    ret = 'Too many matches, specify another filter';
  }

  return (
    <div>
      {ret}
    </div>
  )
}

export default CountryList;