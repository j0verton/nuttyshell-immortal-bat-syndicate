export const EventForm = () => {
    const contentTarget = document.querySelector("#eventContainer")
    contentTarget.innerHTML = `
        <section id="eventCreateForm">
            <h3>Create Event</h3>
            <form>
                <fieldset>
                    <label for="eventName">Name of event:</label><br>
                    <input type="text" name="eventName" id="eventName" class="eventInput">
                </fieldset>

                <fieldset>
                    <label for="eventDate">Date of event:</label><br>
                    <input type="date" name="eventDate" id="eventDate" class="eventInput">
                </fieldset>
                
                <fieldset>
                    <label for="eventAddress">Address:</label><br>
                    <input type="text" name="eventAddress" id="eventAddress" class="eventInput"><br>
                    <label for="eventCity">City:</label><br>
                    <input type="text" name="eventCity" id="eventCity" class="eventInput"><br>
                    <label for="eventState">State:</label><br>
                    <input type="text" name="eventState" id="eventState" class="eventInput" maxlength="2"><br>
                    <label for="eventZip">Zip Code:</label><br>
                    <input type="text" name="eventZip" id="eventZip" class="eventInput" maxlength="5" pattern="\d*{5}">
                </fieldset>
                <button type="button" id="saveEventBtn">Save Event</button>
            </form>
        </section>
                
    `
}