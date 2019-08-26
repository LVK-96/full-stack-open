import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
  const handleAddAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value
    store.dispatch(createAnecdote(content))
    store.dispatch(setNotification(`you added '${content}'`))
    setTimeout(() => {
      store.dispatch(removeNotification())
    }, 5000)
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div><input type='text' name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;
