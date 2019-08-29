import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ setNotification, removeNotification, createAnecdote }) => {
  const handleAddAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value
    createAnecdote(content)
    setNotification(`you added '${content}'`)
    setTimeout(() => {
      removeNotification()
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
  removeNotification
}

const connectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default connectedAnecdoteForm;
