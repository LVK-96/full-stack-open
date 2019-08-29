import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, filter, notification, vote, 
                        setNotification, removeNotification }) => {
  const handleVote = (id, content) => {
    vote(id)
    setNotification(`you voted for '${content}'`)
    setTimeout(() => {
      removeNotification()
    }, 5000)
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
              <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
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
  setNotification,
  removeNotification
}

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default connectedAnecdoteList
