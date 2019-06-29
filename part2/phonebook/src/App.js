import React, { useState } from 'react'
import Filter from './Components/Filter'
import NewContact from './Components/NewContact'
import ContactList from './Components/ContactList'

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]) 
    
    const [ contactFilter, setFilter ] = useState('')
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter contactFilter={contactFilter} 
             setFilter={setFilter} />
            <h2>add new</h2>
            <NewContact  persons={persons} setPersons={setPersons} 
             newName={newName} setNewName={setNewName} newNumber={newNumber} 
             setNewNumber={setNewNumber} />
            <h2>Numbers</h2>
            <ContactList persons={persons} contactFilter={contactFilter} />
        </div>
    )
}

export default App
