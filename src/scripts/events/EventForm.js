import { saveEvent } from "./EventProvider.js"

const eventHub = document.querySelector("body")

//when save button is clicked, create a new event and send it to be saved
eventHub.addEventListener("submit", submitEvent => {
    if (submitEvent.submitter.id === "saveEventBtn") {
        submitEvent.preventDefault()

        const newEvent = {
            name: document.querySelector("#eventName").value,
            date: document.querySelector("#eventDate").value,
            address: document.querySelector("#eventAddress").value,
            city: document.querySelector("#eventCity").value,
            state: document.querySelector("#eventStateDropdown").value,
            zip: document.querySelector("#eventZip").value
        }

        saveEvent(newEvent)
    }
})

//creates form for user to fill out event details
export const EventForm = () => {
    const contentTarget = document.querySelector("#eventContainer")
    const stateAbbreviations = [
        'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
        'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
        'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
        'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
        'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
    ];

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
                    <select name="eventStateDropdown" id="eventStateDropdown" class="eventInput" required>
                        <option value="" hidden>Please select a state...</option>
                        ${
                            stateAbbreviations.map(state => {
                                return `
                                    <option value="${state}">${state}</option> 
                                `
                            }).join("")
                        }
                    </select><br>
                    <label for="eventZip">Zip Code:</label><br>
                    <input type="text" name="eventZip" id="eventZip" class="eventInput" maxlength="5" pattern="[0-9]{5}" required>
                </fieldset>
                <button type="submit" id="saveEventBtn">Save Event</button>
                <button type="button" id="cancelBtn">Cancel</button>
            </form>
        </section>
                
    `
    //prevent any day before today from being selected as a date
    document.querySelector("#eventDate").min = new Date().toISOString().split("T")[0];
}