import { getEvents, useEvents, deleteEvent } from "./EventProvider.js";
import { EventHTML } from "./Event.js";
import { EventForm } from "./EventForm.js";
import "../weather/WeatherList.js"

const eventHub = document.querySelector("body");

//brings up event form when clicking create event button
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "createEventBtn") {
        EventForm();
    }
})

//enables user to go back to dashboard if the cancel button is clicked
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "cancelBtn") {
        const eventArray = useEvents();
        render(eventArray);
        findNextEvent(eventArray);
    }
})

//sends event for which the delete button was pressed to be deleted
eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("deleteEventBtn--")) {
        const [prefix, id] = event.target.id.split("--")
        deleteEvent(id)
    }
})

//repopulates DOM with events when the state of events has changed
eventHub.addEventListener("eventStateChanged", event => {
    EventList();
})

//collects events to be rendered and then uses them in the render function
export const EventList = () => {
    getEvents()
        .then(() => {
            EventContainer();
            const eventArray = useEvents();
            render(eventArray);
            findNextEvent(eventArray);
        })
}

//finds next event and makes its appearance stand out to user
const findNextEvent = eventArray => {
    
    const todaysDate = new Date().toISOString().split("T")[0]; 
    eventArray.forEach(event => {
        
        //hides all past events from user on DOM
        if (event.date < todaysDate) {
            document.querySelector(`#eventDetails--${event.id}`).hidden = true;
        } 

    })

    //finds the first event that is today or later and changes its CSS
    const nextEvent = eventArray.find(event => {
        return document.querySelector(`#eventDetails--${event.id}`).hidden === false;
    })
    document.querySelector(`#eventDetails--${nextEvent.id}`).className += "nextEvent";

}

//renders events to DOM
const render = eventArray => {
    const contentTarget = document.querySelector("#eventContainer");
    const HTMLRep = eventArray.map(event => EventHTML(event)).join("");

    contentTarget.innerHTML = `
        <h2>Events</h2>
        <button type="button" id="createEventBtn">Create Event</button>
        ${HTMLRep}
    `
}

//create event container on DOM
const EventContainer = () => {
    const contentTarget = document.querySelector("#main");
    contentTarget.innerHTML += `<section id="eventContainer"></section>`
}