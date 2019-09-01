import axios from 'axios';

const baseUrl = '/api/users';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

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
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (exception) {
    console.log(exception);
    return null;
  }
};

const update = async (user) => {
  const id = user.id;
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.put(`${baseUrl}/${id}`, user, config);
    return response.data;
  } catch (exception) {
    console.log(exception);
    return null;
  }
};

const remove = async (user) => {
  const id = user.id;
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (exception) {
    console.log(exception);
    return null;
  }
};

export default {
  setToken, getAll, create, update, remove,
};