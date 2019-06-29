import React from 'react'

const NewContact = ({ persons, setPersons, setNewName, setNewNumber, 
                     newName, newNumber }) => {
    const addContact = (event) => {
        event.preventDefault()
        if (persons.map(person => person.name).includes(newName)) {
            const alert_msg = `${newName} is already added to the phonebook`
            window.alert(alert_msg)
        } else {
            const nameObj = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(nameObj))
        }
        
        setNewName('')
        setNewNumber('')
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