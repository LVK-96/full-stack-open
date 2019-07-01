import React from 'react';

const CountryName = ({ name, setFilter }) => {
  const handleClick = () => {
    setFilter(name);
  } 

  return (
    <div>
      {name} <button onClick={handleClick}>show</button>
    </div>
  )
}

export default CountryName;