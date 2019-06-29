import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import NewContact from './Components/NewContact'
import ContactList from './Components/ContactList'
import axios from 'axios';

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ contactFilter, setFilter ] = useState('')
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    
    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }
    
    useEffect(hook, [])
    
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
