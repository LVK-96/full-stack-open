import React from 'react'
import Contact from './Contact'

const ContactList = ({ persons, contactFilter, setPersons }) => {
    const contacts = persons.filter(person => person.name.toLowerCase()
                            .includes(contactFilter.toLowerCase()))
                            .map(person => <Contact key={person.id} 
                            person={person} persons={persons} 
                            setPersons={setPersons} />)
    
    return (
        <div>
            {contacts}   
        </div>
    )
}

export default ContactList