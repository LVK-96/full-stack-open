import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import NewContact from './Components/NewContact'
import ContactList from './Components/ContactList'
import personService from './services/persons'
import Notification from './Components/Notification'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ contactFilter, setFilter ] = useState('')
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ NotificationMessage, setNotificationMessage ] = useState({
        msg: null,
        error: false
    })
    
    const hook = () => {
        personService.getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }
    
    useEffect(hook, [])
    
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification text={NotificationMessage} />
            <Filter contactFilter={contactFilter} 
             setFilter={setFilter} />
            <h2>add new</h2>
            <NewContact  persons={persons} setPersons={setPersons} 
             newName={newName} setNewName={setNewName} newNumber={newNumber} 
             setNewNumber={setNewNumber} 
             setNotificationMessage={setNotificationMessage} />
            <h2>Numbers</h2>
            <ContactList persons={persons} contactFilter={contactFilter} 
             setPersons={setPersons} />
        </div>
    )
}

export default App
