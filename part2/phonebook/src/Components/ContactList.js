import React from 'react'
import Contact from './Contact'

const ContactList = ({ persons, contactFilter }) => {

    const contacts = persons.filter(person => person.name.toLowerCase()
                            .includes(contactFilter.toLowerCase()))
                            .map(person => <Contact key={person.name} 
                            name={person.name} number={person.number} />)
    
    return (
        <div>
            {contacts}   
        </div>
    )
}

export default ContactList