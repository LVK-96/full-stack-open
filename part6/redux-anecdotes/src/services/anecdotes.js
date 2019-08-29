import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (exception) {
    console.log(exception.message)
    return null
  }
};

const create = async (content) => {
  try {
    const newObject = { content: content, likes: 0 }
    const response = await axios.post(baseUrl, newObject)
    return response.data
  } catch (exception) {
    console.log(exception.message)
    return null
  }
}

export default {
  getAll,
  create
}
