import api from "../Settings.js";

let weather;

export const useWeather = () => weather;

export const getWeather = event => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${event.zip},us&units=imperial&appid=${api.weatherKey}`)
        .then(response => response.json())
        .then(parsedWeather => {
            weather = parsedWeather.list
        })

}