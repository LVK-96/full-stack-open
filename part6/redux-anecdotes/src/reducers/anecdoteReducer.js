import anecdotesService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdotesService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => 
        anecdote.id === action.data.id ? action.data: anecdote
      )

    case 'NEW':
      return state.concat(action.data)
  
    case 'INIT':
      return action.data

  default:
      return state
  }
}

export default anecdoteReducer
