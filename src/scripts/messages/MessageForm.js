const eventHub = document.querySelector("body")


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

