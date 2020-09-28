import api from "../Settings.js";

let weather;

//creates a copy of the the array of gotten weather
export const useWeather = () => weather.slice();

//gets weather from the openweather API in imperial units at the given zip code and assigns it to the weather variable
export const getWeather = object => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${object.zip},us&units=imperial&appid=${api.weatherKey}`)
        .then(response => response.json())
        .then(parsedWeather => {
            weather = parsedWeather.list
        })

}

//gets weather from openweather API in imperial units at given coordinates and assigns it to the weather variable
export const getCurrentWeather = locationObj => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${locationObj.coords.latitude}&lon=${locationObj.coords.longitude}&units=imperial&cnt=8&appid=${api.weatherKey}`)
    .then(response => response.json())
    .then(parsedWeather => {
        weather = parsedWeather.list
        console.log(weather)
    })
}