import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notifMessage, setNotifMessage ] = useState(null)
  const [ notifType, setNotifType ] = useState(null)
  
  useEffect(() => 
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  , [])
  
  const filterPersons = (filter) => {
    const filterFunction = (person) => person.name.toLowerCase().includes(
      filter.toLowerCase())
    return filterFunction
  }

  const filteredPersons = newFilter === ''
    ? persons
    : persons.filter(filterPersons(newFilter))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  const addNewPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNum
    }
    if (persons.some(person => person.name === newPerson.name)) {
      const replaceNum = window.confirm(`${newPerson.name} has already been added to the phonebook, ${
        'replace the old number with a new one?'}`)
      if (replaceNum) {
        const id = persons.find(person => person.name === newPerson.name).id
        personService
          .update(id, newPerson)
          .then(returnedPerson =>
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson)))
          .catch(error => {
            setNotifMessage(`Information of ${newPerson.name} has already been removed from server`)
            setNotifType(`error`)
            setTimeout(() => {
              setNotifMessage(null)
              setNotifType(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        .then(() => {
          setNotifMessage(`Added ${newPerson.name}`)
          setNotifType('success')
          setTimeout(() => {
            setNotifMessage(null)
            setNotifType(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNum('')
  }

  const deletePerson = (person) => {
    const handleDelete = () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        personService
        .deletePerson(person.id)
        .then(() => setPersons(persons.filter(p => p !== person)))
      }
    }
    return handleDelete
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} classes={`notification ${notifType}`}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNum={newNum}
        handleNumChange={handleNumChange}
        addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={deletePerson}/>
    </div>
  )
}

export default App