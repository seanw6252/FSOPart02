import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  
  useEffect(() => 
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data))
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
      alert(`${newPerson.name} has already been added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNum('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App