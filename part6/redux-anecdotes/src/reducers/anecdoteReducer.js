export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW',
    data: anecdote
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id === id ? votedAnecdote : anecdote
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
