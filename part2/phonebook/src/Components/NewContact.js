import React from 'react'
import personService from '../services/persons'

const NewContact = ({ persons, setPersons, setNewName, setNewNumber, 
                     newName, newNumber, setNotificationMessage }) => {
    const addContact = (event) => {
        event.preventDefault()
        if (persons.map(person => person.name).includes(newName)) {
            const alert_msg = `${newName} is already added to the phonebook, 
                               replace old number with new one?`
            if(window.confirm(alert_msg)) {
                const nameObj = persons.find(person => person.name === newName)
                const changedObj = { ...nameObj, number: newNumber }
                personService.update(changedObj)
                    .then(returnedObj => {
                        setPersons(persons.map(p => p.id !== changedObj.id 
                                   ? p : returnedObj))
                        setNewName('')
                        setNewNumber('')
                        setNotificationMessage({
                            msg: `Changed number for ${changedObj.name}`,
                            error: false
                        })
                        setTimeout(() => setNotificationMessage({
                            msg: null,
                            error: false
                        }), 5000)
                    })
                    .catch(e => {
                        setNotificationMessage({
                            msg: `${changedObj.name} is already deleted 
                                  from the server`,
                            error: true
                        })
                        setTimeout(() => setNotificationMessage({
                            msg: null,
                            error: false
                        }), 5000)
                        setPersons(persons.filter(person => 
                                   person.id !== changedObj.id))
                    })
            }
        } else {
            const nameObj = {
                name: newName,
                number: newNumber
            }
            personService.create(nameObj)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setNotificationMessage({
                        msg: `Added ${returnedPerson.name}`,
                        error: false
                    })
                    setTimeout(() => setNotificationMessage({
                        msg: null,
                        error: false
                    }), 5000)
                })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value) 
    }
    
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value) 
    }
    
    return (  
        <form onSubmit={addContact}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} 
                            onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default NewContact