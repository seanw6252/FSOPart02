import React from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
  if (countries.length === 250) {
    return <div>Enter filter</div>
  }
  else if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (countries.length === 1) {
    return (
      <Country country={countries[0]} singleView={true} />
    )
  }
  else {
    return (
      <ul>
        {countries.map(country =>
            <Country key={country.callingCodes[0]} country={country} singleView={false}/>
        )}
      </ul>
    )
  }
}

export default Countries