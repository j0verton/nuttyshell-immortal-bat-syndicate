const eventHub = document.querySelector("body")

//creates the message form and display fied
export const NewMessageForm = () => { 
    let activeUser = sessionStorage.getItem("activeUser")
    document.querySelector("aside").innerHTML += 
    `   <section id="messageContainer">
            <div id="messages"></div>
            <form id="newMessageForm">
                <input id="newMessage" type="text" placeholder="Enter your message">
                <button type="button" id="saveMessageBtn--${activeUser}">Send</button>
            </form>
        </section>
    `
}

// creates a custom event for a save message button click
document.addEventListener("click", clickEvent => {
    clickEvent.preventDefault()
    if(clickEvent.target.id.startsWith("saveMessageBtn") && document.getElementById("newMessage").value) {
        const [prefix, activeUserId] = clickEvent.target.id.split("--")
        let newEvent = new CustomEvent("messageSaved", {
            detail: {
                activeUserId: parseInt(activeUserId),
                message: document.getElementById("newMessage").value            
            }
        })
        eventHub.dispatchEvent(newEvent)
        document.getElementById("newMessage").value = ""
    }
})
document.addEventListener("keyup", e => {
    e.preventDefault
    if (e.key === 13){
        if(document.getElementById("newMessage").value) {
            const [prefix, activeUserId] = clickEvent.target.id.split("--")
            let newEvent = new CustomEvent("messageSaved", {
                detail: {
                    activeUserId: parseInt(activeUserId),
                    message: document.getElementById("newMessage").value            
                }
            })
            eventHub.dispatchEvent(newEvent)
            document.getElementById("newMessage").value = ""
        }
}
})

