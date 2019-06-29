import React from 'react'

const Filter = ({ contactFilter, setFilter }) => {
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            filter shown with <input value={contactFilter} 
                            onChange={handleFilterChange} /> 
        </div>
    )
}

export default Filter