import React from 'react'

const PersonForm = ({ newName, handleNameChange, newNum, handleNumChange, addNewPerson}) => {
  return(
    <form>
      <div>
        name:
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number:
        <input
          value={newNum}
          onChange={handleNumChange}
        />
      </div>
      <div>
        <button type="submit" onClick={addNewPerson}>add</button>
      </div>
    </form>
  )
  
}

export default PersonForm