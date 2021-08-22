import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DetailedView = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
    .then(response => setWeather(response.data))
  }, [])

  console.log(weather)
  
  return (
    <div>
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h3>Languages:</h3>
    <ul>
      {country.languages.map(language =>
        <li key={language.iso639_2}>{language.name}</li>  
      )}
    </ul>
    <img src={country.flag} alt={`Flag of ${country.name}`} height="200" width="200"/>
    <h2>Weather in {country.capital}</h2>
    {/* <p><strong>temperature:</strong> {weather.current.temperature} Celcius</p>
    <img src={weather.current.weather_icons[0]}/>
    <p><strong>wind:</strong> {weather.current.wind_speed} km/h, direction {weather.current.wind_dir}</p> */}
    {(typeof weather.current != 'undefined') ? (
      <>
      <p><strong>temperature:</strong> {weather.current.temperature} Celcius</p>
      <img src={weather.current.weather_icons[0]}/>
      <p><strong>wind:</strong> {weather.current.wind_speed} km/h, direction {weather.current.wind_dir}</p>
      </>
    ): (
      <></>
    )}
    </div>
  )
}

const Country = ({ country, singleView}) => {
  const [showDetailed, setShowDetailed] = useState(false)
  
  if (singleView) {
    return (
      <DetailedView country={country}/>
    )
  }
  else {
    let detailedView;
    if (showDetailed) {
      detailedView = <DetailedView country={country}/>
    }
    else {
      detailedView = <></>
    }
    return(
      <li>
        {country.name}
        <button onClick={() => setShowDetailed(!showDetailed)}>show</button>
        {detailedView}
      </li>
    )
  }
}

export default Country