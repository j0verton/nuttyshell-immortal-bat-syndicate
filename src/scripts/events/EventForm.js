import { saveEvent } from "./EventProvider.js"

const eventHub = document.querySelector("body")

eventHub.addEventListener("submit", submitEvent => {
    if (submitEvent.submitter.id === "saveEventBtn") {
        submitEvent.preventDefault()

        const newEvent = {
            name: document.querySelector("#eventName").value,
            date: document.querySelector("#eventDate").value,
            address: document.querySelector("#eventAddress").value,
            city: document.querySelector("#eventCity").value,
            state: document.querySelector("#eventState").value,
            zip: document.querySelector("#eventZip").value
        }
        console.log(newEvent)
        saveEvent(newEvent)
    }
})

export const EventForm = () => {
    const contentTarget = document.querySelector("#eventContainer")
    contentTarget.innerHTML = `
        <section id="eventCreateForm">
            <h3>Create Event</h3>
            <form class="newEventForm">
                <fieldset>
                    <label for="eventName">Name of event:</label><br>
                    <input type="text" name="eventName" id="eventName" class="eventInput" required>
                </fieldset>

                <fieldset>
                    <label for="eventDate">Date of event:</label><br>
                    <input type="date" name="eventDate" id="eventDate" class="eventInput" required>
                </fieldset>
                
                <fieldset>
                    <label for="eventAddress">Address:</label><br>
                    <input type="text" name="eventAddress" id="eventAddress" class="eventInput" required><br>
                    <label for="eventCity">City:</label><br>
                    <input type="text" name="eventCity" id="eventCity" class="eventInput" required><br>
                    <label for="eventState">State:</label><br>
                    <input type="text" name="eventState" id="eventState" class="eventInput" maxlength="2" required><br>
                    <label for="eventZip">Zip Code:</label><br>
                    <input type="text" name="eventZip" id="eventZip" class="eventInput" maxlength="5" required>
                </fieldset>
                <button type="submit" id="saveEventBtn">Save Event</button>
            </form>
        </section>
                
    `
    //prevent any day before today from being selected as a date
    document.querySelector("#eventDate").min = new Date().toISOString().split("T")[0];
}