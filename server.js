import express from 'express';
import { fetchWeatherFunc } from './fetchWeather.js';

const app = express();



// Wetter der Stadt erfragen
app.get('/:city', async (req,res) => {
    // Parameter auslesen
    let {city} = req.params

    // Funktion aufrufen
    const weather = await fetchWeatherFunc(city)
    
    // Wetterobjekt als JSON zurückgeben
    res.json(weather)


})



const server = app.listen(5000, () => {
   console.log("The server is listening... 🐒") 
});