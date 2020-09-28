let events = []

const eventHub = document.querySelector("body")

//let's the eventHub know about any change to the API
const dispatchStateChangeEvent = () => {
    eventHub.dispatchEvent(new CustomEvent("eventStateChanged"))
}

//breaks apart and sorts the events by date
export const useEvents = () => {
    const sortedByDate = events.sort(
        (currentEvent, nextEvent) =>
            Date.parse(currentEvent.date) - Date.parse(nextEvent.date)
    ).slice()
    return sortedByDate
}

//gets events from API
export const getEvents = () => {
    return fetch("http://localhost:8088/events?_expand=user")
        .then(response => response.json())  
        .then(parsedEvents => {
            events = parsedEvents
        })
}

//saves event to API and then triggers state change event
export const saveEvent = eventObj => {
    fetch("http://localhost:8088/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventObj)
    })
        .then(dispatchStateChangeEvent) 
}

//deletes event from API and then triggers state change event
export const deleteEvent = eventId => {
    fetch(`http://localhost:8088/events/${eventId}`, {
        method: "DELETE"
    })
        .then(dispatchStateChangeEvent) 
}

export const updateEvent = eventObj => {
    fetch(`http://localhost:8088/events/${eventObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventObj)
    })
        .then(dispatchStateChangeEvent) 
}