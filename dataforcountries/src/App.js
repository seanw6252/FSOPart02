import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from "./components/Countries"

const App = () => {

  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() =>
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
  , [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filterCountries = (filter) => {
    return ((country) => country.name.toLowerCase().includes(
      filter.toLowerCase()
    ))
  }

  const filteredCountries = search === ""
    ? countries
    : countries.filter(filterCountries(search))

  return (
    <div>
      <form>
        find countries
        <input value={search} onChange={handleSearchChange}/>
      </form>
      <Countries countries={filteredCountries}/>
    </div>
  );
}

export default App; 