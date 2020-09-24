import { getEvents, useEvents } from "./EventProvider.js"
import { EventHTML } from "./Event.js"
import { EventForm } from "./EventForm.js"

const eventHub = document.querySelector("body")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "createEventBtn") {
        EventForm()
    }
})

eventHub.addEventListener("eventStateChanged", event => {
    EventList();
})

export const EventList = () => {
    getEvents()
        .then(() => {
            render(useEvents())
        })
}

const render = eventArray => {
    const contentTarget = document.querySelector("#main")
    const HTMLRep = eventArray.map(event => EventHTML(event)).join("")

    contentTarget.innerHTML = `
        <section id="eventContainer">
            <h2>Events</h2>
            <button type="button" id="createEventBtn">Create Event</button>
            ${HTMLRep}
        </section>
    `
}