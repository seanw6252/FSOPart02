import React from 'react'

const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button type="button" onClick={handleDelete(person)}>delete</button>
        </li>
      ))}
  </ul>
  )
}

export default Persons