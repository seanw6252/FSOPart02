import React from 'react'

const Filter = ({ newFilter, handleFilterChange}) => {
  return (
    <div>
      <form>
        <div>
          filter shown with
          <input
            value={newFilter}
            onChange={handleFilterChange}
          />
        </div>
      </form>
    </div>
  )
  
}

export default Filter