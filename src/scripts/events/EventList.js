import { getEvents, useEvents, deleteEvent, updateEvent } from "./EventProvider.js";
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
    if (clickEvent.target.id.startsWith("deleteEventBtn--")) {
        const [prefix, id] = clickEvent.target.id.split("--")
        deleteEvent(id)
    }
})

//when edit button is clicked, set the event form and fill it with that events details
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("editEventBtn--")) {
        EventForm()

        //save the id in the save button while preventing button from creating a new object upon save
        const [prefix, id] = clickEvent.target.id.split("--")
        document.querySelector("#saveEventBtn").id = `saveEventBtn--${id}`

        const event = useEvents().find(event => event.id === parseInt(id))
        const name = document.querySelector("#eventName")
        const date = document.querySelector("#eventDate")
        const address = document.querySelector("#eventAddress")
        const city = document.querySelector("#eventCity")
        const state = document.querySelector("#eventStateDropdown")
        const zip = document.querySelector("#eventZip")

        name.value = event.name
        date.value = event.date
        address.value = event.address
        city.value = event.city
        state.value = event.state
        zip.value = event.zip

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
            const eventArray = useEvents();
            render(eventArray);
            findNextEvent(eventArray);
            eventArray.forEach(event => {
                if (event.userId === parseInt(sessionStorage.getItem("activeUser"))) {
                    document.querySelector(`#eventDetails--${event.id}`).innerHTML += `
                    <button type="button" id="editEventBtn--${event.id}">Edit Event</button>
                    <button type="button" id="deleteEventBtn--${event.id}">Delete Event</button>
                    `
                }
            })
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