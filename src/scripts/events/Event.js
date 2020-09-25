//Creates an HTML representation of an event
export const EventHTML = eventObj => {
    return `
        <div id="eventDetails--${eventObj.id}">
            <h4>${eventObj.name}</h4>
            <p>${eventObj.date}</p>
            <p>${eventObj.address}</p>
            <p>${eventObj.city}, ${eventObj.state} ${eventObj.zip}</p>
            <button type="button" id="showWeatherBtn--${eventObj.id}">Show Weather</button><br>
            <div class="weatherContainer--${eventObj.id}"></div>
            <button type="button" id="deleteEventBtn--${eventObj.id}">Delete Event</button>
        </div>
    `
}