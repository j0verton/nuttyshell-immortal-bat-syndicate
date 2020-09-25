import { WeatherHTML } from "./Weather.js";
import { getWeather, useWeather } from "./WeatherProvider.js";
import { useEvents } from "../events/EventProvider.js";

const eventHub = document.querySelector("body");

//Listen for click on weather button and render or hide as appropriate
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.textContent === "Show Weather") {
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
                    <p>Sorry, I can only predict weather for events in the next five days.</p>
                    `
                }
            })

        clickEvent.target.textContent = "Hide Weather";

    } else if (clickEvent.target.textContent === "Hide Weather") {
        const [prefix, id] = clickEvent.target.id.split("--")
        const contentTarget = document.querySelector(`.weatherContainer--${id}`);
        contentTarget.innerHTML = "";
        clickEvent.target.textContent = "Show Weather";
    }
})

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
        dateToCompare = weather.dt_txt.split(" ")[0]
        return eventObj.date === dateToCompare
    })
    
    // If forecast exists, find max and min temp for the day and assign it to returned weather object
    if (forecastExists) {
        let tempMinArray = []; 
        let tempMaxArray = [];
        const filteredWeather = weatherArray.filter(weather => weather.dt_txt.split(" ")[0] === dateToCompare)
        filteredWeather.forEach(weather => {
            tempMinArray.push(weather.main.temp_min)
            tempMaxArray.push(weather.main.temp_max)
        })
        forecastExists.main.temp_min = tempMinArray.sort((a,b) => a-b)[0]
        forecastExists.main.temp_max = tempMaxArray.sort((a,b) => b-a)[0]
        return forecastExists
    } else {
        return undefined
    }
    
}