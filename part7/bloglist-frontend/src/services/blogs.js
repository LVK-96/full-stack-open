import axios from 'axios';

const baseUrl = `${BACKEND_URL}/api/blogs`;
console.log(baseUrl);

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

const update = async (blog) => {
  const id = blog.id;
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.put(`${baseUrl}/${id}`, blog, config);
    return response.data;
  } catch (exception) {
    console.log(exception);
    return null;
  }
};

const remove = async (blog) => {
  const id = blog.id;
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

const addComment = async (blog, comment) => {
  const id = blog.id;
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.post(`${baseUrl}/${id}/comments`,
      { text: comment }, config);
    return response.data;
  } catch (exception) {
    console.log(exception);
    return null;
  }
};

export default {
  setToken, getAll, create, update, remove, addComment
};
