import React from 'react';

const Search = ({ setFilter, countryFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      find countries <input value={countryFilter} 
                      onChange={handleFilterChange} />
    </div>
  );
}

export default Search;