// Fetch importieren
import fetch from 'node-fetch'

// Den API Key aus .env File importieren (die Datei müssst ihr für euch erstellen)
import * as dotenv from 'dotenv'
dotenv.config()
const {API_KEY} = process.env

// Stadt auslesen
const [,,city] = process.argv


export async function fetchWeatherFunc(city="Berlin"){
  
//   Koordinaten der Stadt erfragen
  const getCityJSON = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
  const cityArray = await getCityJSON.json()
  const {lat, lon} = cityArray[0]
  
//  Koordinaten benutzen um Wetter abzufragen
  const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
  const weather = await result.json() 

// Das Ergebnis in kleinen Objekt speichern
  const myWeather = {
    city,
    temp: weather.main.temp,
    how: weather.weather[0].description
  }

  return myWeather
}

// Run the programm
fetchWeatherFunc(city).then(res => console.log(`
 WEATHER PROGRAMM\n******************\n\n
It is now ${res.temp} in ${res.city}\nThe current weather conditions are: ${res.how}
`))

