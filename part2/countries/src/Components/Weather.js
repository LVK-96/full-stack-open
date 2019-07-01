import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [ temperature, setTemperature ]  = useState('');
  const [ conditionIcon, setConditionIcon ]  = useState('');
  const [wind, setWind ] = useState('');
  
  const hook = () => {
    axios
      .get('https://api.apixu.com/v1/current.json?key='
           + process.env.REACT_APP_APIXU_KEY + '&q=' + capital)
      .then(response => {
        const resp = response.data.current; 
        setTemperature(resp.temp_c);
        setConditionIcon(resp.condition.icon);
        setWind({
          'speed': resp.wind_kph,
          'direction': resp.wind_dir
        });
      });
  }  

  useEffect(hook, []);

  return (
    <div>
      <div>
        <b>temperature</b> {temperature} Celsius
      </div>
      <div>
        <img src={conditionIcon} alt='condition' />
      </div>
      <div>
        <b>wind:</b> {wind.speed} kph direction {wind.direction}
      </div>
    </div> 
  )
}

export default Weather;