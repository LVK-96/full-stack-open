import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const handleFilterChange = (event) => {
    store.dispatch(setFilter(event.target.value))
  }
    
  return (
    <div>
      Filter <input type='text' onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
