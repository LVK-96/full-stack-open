import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, filter, notification, vote, 
                        showNotificationWithTimeout }) => {
  const handleVote = (anecdote) => {
    vote(anecdote)
    showNotificationWithTimeout(`you voted for '${anecdote.content}'`, 5)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
        {anecdotes.map(anecdote => 
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a,b) => a.votes < b.votes),
    filter: state.filter,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  vote,
  showNotificationWithTimeout
}

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default connectedAnecdoteList
