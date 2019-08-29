import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({ setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
    
  return (
    <div>
      Filter <input type='text' onChange={handleFilterChange} />
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
  setFilter
}

const connectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default connectedFilter
