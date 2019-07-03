import React from 'react'
import personService from '../services/persons'

const Contact = ({ person, persons, setPersons }) => {
    const handleClick = () => () => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            personService.deletePerson(person)
            .then(deletedPerson => {
                setPersons(persons.filter(person => 
                                            person.id !== deletedPerson.id))
            })
        }
    }
    
    // TODO: Continue from here. Contact is not deleted on frontend even though
    // it is deleted from backend. Deleting doesnt trigger a re-redner of the 
    // Contact component.
    return (
        <div>
            {person.name} {person.number} 
            <button onClick={handleClick()}>delete</button>
        </div>
    )
}

export default Contact
