//Creates an HTML representation of an event
export const EventHTML = eventObj => {
    return `
        <div id="eventDetails--${eventObj.id}" class="eventCard">
            <h4>${eventObj.name}</h4>
            <p>${eventObj.date}</p>
            <p>${eventObj.address}</p>
            <p>${eventObj.city}, ${eventObj.state} ${eventObj.zip}</p>
            <p>CreaTed by: ${eventObj.user.username}</p>
            <button type="button" id="showWeatherBtn--${eventObj.id}">Show WeaTher</button><br>
            <div class="weatherContainer--${eventObj.id}"></div>
        </div>
    `
}