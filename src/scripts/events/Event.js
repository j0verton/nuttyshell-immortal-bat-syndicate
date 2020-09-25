export const EventHTML = eventObj => {
    return `
        <div id="eventDetails">
            <h4>${eventObj.name}</h4>
            <p>${eventObj.date}</p>
            <p>${eventObj.address}</p>
            <p>${eventObj.city}, ${eventObj.state} ${eventObj.zip}</p>
            <button type="button" id="showWeatherBtn--${eventObj.id}">Show Weather</button>
        </div>
    `
}