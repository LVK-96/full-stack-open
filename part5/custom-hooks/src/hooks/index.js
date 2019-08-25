import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function getResources() {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    }

    getResources();
  }, [baseUrl]);
  
  const getAll = async () => {
    try {
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (exception) {
      console.log(exception);
      return null;
    }
  };

  const create = async (newObject) => {
    try {
      const response = await axios.post(baseUrl, newObject);
      setResources(resources.concat(response.data)); 
      return response.data;
    } catch (exception) {
      console.log(exception);
      return null;
    }
  };


  return [
    resources, 
    {
      setResources,
      getAll,
      create
    }
  ];
}
