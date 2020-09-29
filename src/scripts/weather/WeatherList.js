import { WeatherHTML } from "./Weather.js";
import { getWeather, useWeather, getCurrentWeather } from "./WeatherProvider.js";
import { useEvents } from "../events/EventProvider.js";

const eventHub = document.querySelector("body");

//Listen for click on weather button and render or hide as appropriate
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.textContent === "Show WeaTher") {
        const [prefix, id] = clickEvent.target.id.split("--")
        const eventForWeather = useEvents().find(event => event.id === parseInt(id))
        getWeather(eventForWeather)
            .then(() => {
                const eventWeather = weatherDate(eventForWeather, useWeather())

                if (eventWeather) {
                    renderWeather(eventForWeather, eventWeather)
                } else {
                    const contentTarget = document.querySelector(`.weatherContainer--${eventForWeather.id}`);
                    contentTarget.innerHTML = `
                    ${currentWeatherHTML(useWeather())}
                    <p>Sorry, I can only predicT weaTher for evenTs in the nexT five days.</p>
                    `
                }
            })

        clickEvent.target.textContent = "Hide WeaTher";

    } else if (clickEvent.target.textContent === "Hide WeaTher") {
        const [prefix, id] = clickEvent.target.id.split("--")
        const contentTarget = document.querySelector(`.weatherContainer--${id}`);
        contentTarget.innerHTML = "";
        clickEvent.target.textContent = "Show WeaTher";
    }
})

//tries to get location of user and display the current weather for that location
export const WeatherForLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(renderCurrentWeather);
    } else {
      document.querySelector("header").innerHTML += "Can'T locaTe user posiTion"
    }
}

//renders weather HTML on DOM for current user
const renderCurrentWeather = (position) => {
    getCurrentWeather(position)
        .then(() => {
            const contentTarget = document.querySelector("header")
            contentTarget.innerHTML += `${currentWeatherHTML(useWeather())}`
        })
}

//returns HTML representation of weather for the current date
const currentWeatherHTML = (weatherArray) => {
    const currentDate = new Date(Date.now()-18000000).toISOString().split("T")[0]
    const currentWeather = maxMinTemp(weatherArray[0], weatherArray, currentDate)
    return WeatherHTML(currentWeather)
}

//Render weather HTML in proper event
const renderWeather = (eventObj, weather) => {
  const contentTarget = document.querySelector(`.weatherContainer--${eventObj.id}`);
  contentTarget.innerHTML = `
    ${WeatherHTML(weather)}
  `
}

//See if weather API has a forecast for the events date
const weatherDate = (eventObj, weatherArray) => {
    let dateToCompare;
    
    //Find forecast if it exists
    const forecastExists = weatherArray.find(weather => { 
        //get dates in CST
        dateToCompare = new Date((weather.dt-18000)*1000).toISOString().split("T")[0]
        return eventObj.date === dateToCompare
    })
    
    // If forecast exists, find max and min temp for the day and assign it to returned weather object
    if (forecastExists) {
        const weatherForDate = maxMinTemp(forecastExists, weatherArray, dateToCompare)
        return weatherForDate;
    } else {
        return undefined
    }
    
}

//finds the high and low temperature for the day
const maxMinTemp = (weatherObj, weatherArray, date) => {
    let tempMinArray = []; 
    let tempMaxArray = [];
    const filteredWeather = weatherArray.filter(weather => new Date((weather.dt-18000)*1000).toISOString().split("T")[0] === date)
    filteredWeather.forEach(weather => {
        tempMinArray.push(weather.main.temp_min)
        tempMaxArray.push(weather.main.temp_max)
    })
    weatherObj.main.temp_min = tempMinArray.sort((a,b) => a-b)[0]
    weatherObj.main.temp_max = tempMaxArray.sort((a,b) => b-a)[0]
    return weatherObj
}