import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes
  const anecdoteFilter = store.getState().filter 
  
  const handleVote = (id, content) => {
    store.dispatch(vote(id))
    store.dispatch(setNotification(`you voted for '${content}'`))
    setTimeout(() => {
      store.dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.filter(a => 
          a.content.toLowerCase().includes(anecdoteFilter.toLowerCase())
        )
        .sort((a,b) => a.votes < b.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList
