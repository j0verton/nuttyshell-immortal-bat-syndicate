let events = []

// const eventHub = document.querySelector("body")

export const useEvents = () => {
    const sortedByDate = events.sort(
        (currentEvent, nextEvent) =>
            Date.parse(currentEvent.date) - Date.parse(nextEvent.date)
    ).slice()
    return sortedByDate
}

export const getEvents = () => {
    return fetch("http://localhost:8088/events")
        .then(response => response.json())  
        .then(parsedEvents => {
            events = parsedEvents
        })
}

// export const saveEvent = eventObj => {
//     fetch("http://localhost:8088/events", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(eventObj)
//     })
//         .then(getEvents) 
//         .then(dispatchStateChangeEvent) 
// }

// export const deleteEvent = eventObj => {
//     fetch(`http://localhost:8088/events/${eventObj.id}`, {
//         method: "DELETE"
//     })
//         .then(getEvents) 
//         .then(dispatchStateChangeEvent) 
// }

// export const updateEvent = eventObj => {
//     fetch(`http://localhost:8088/events/${eventObj.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(eventObj)
//     })
//         .then(getEvents) 
//         .then(dispatchStateChangeEvent) 
// }