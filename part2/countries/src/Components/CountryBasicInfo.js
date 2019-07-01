import React from 'react';

const CountryBasicInfo = ({capital, population }) => (
  <div>
    <div>
      capital {capital}
    </div>    
    <div>
      population {population}
    </div>    
  </div>
);

export default CountryBasicInfo;