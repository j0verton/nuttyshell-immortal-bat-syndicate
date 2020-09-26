import api from "../Settings.js";

let weather;

//creates a copy of the the array of gotten weather
export const useWeather = () => weather.slice();

//gets weather from the openweather API in imperial units at the given zip code and assigns it to the weather variable
export const getWeather = event => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${event.zip},us&units=imperial&appid=${api.weatherKey}`)
        .then(response => response.json())
        .then(parsedWeather => {
            weather = parsedWeather.list
        })

}