import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteForm = ({ showNotificationWithTimeout, createAnecdote }) => {
  const handleAddAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value
    createAnecdote(content)
    showNotificationWithTimeout(`you added '${content}'`, 5)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  createAnecdote,
  showNotificationWithTimeout
}

const connectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default connectedAnecdoteForm;
