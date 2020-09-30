import { replaceTs } from "../replaceTs.js"

const eventHub = document.querySelector("body")

//creates the message form and display fied
export const NewMessageForm = () => { 
    let activeUser = sessionStorage.getItem("activeUser")
    document.querySelector("aside").innerHTML += 
    `   <section id="messageContainer">
            <div id="messages"></div>
            <div id="newMessageForm">
                <input id="newMessage" type="text" placeholder="EnTer your message">
                <button type="button" id="saveMessageBtn--${activeUser}">Send</button>
            </div>
        </section>
    `
}

// creates a custom event for a save message button click
document.addEventListener("click", clickEvent => {
    
    if(clickEvent.target.id.startsWith("saveMessageBtn") && document.getElementById("newMessage").value) {
        clickEvent.preventDefault()
        const messageArray = [
            document.getElementById("newMessage")
        ]
        replaceTs(messageArray)

        const [prefix, activeUserId] = clickEvent.target.id.split("--")
        let newEvent = new CustomEvent("messageSaved", {
            detail: {
                activeUserId: parseInt(activeUserId),
                message: document.getElementById("newMessage").value            
            }
        })
        if (document.querySelector(".privateMessageField")){
            let targetUser = document.querySelector(".privateMessageField").id
            newEvent.detail.user = document.querySelector(".privateMessageField").id
            newEvent.detail.message = `@${targetUser}: ${document.getElementById("newMessage").value}`
            eventHub.dispatchEvent(newEvent)
            document.getElementById("newMessage").value = ""
            document.querySelector(".privateMessageField").remove()
        } else {
            eventHub.dispatchEvent(newEvent)
            document.getElementById("newMessage").value = ""
        }
    }
})

//listens for when friends are chosen from the dropdown to message
eventHub.addEventListener("friendChosenForMessage", e => {
    document.querySelector("#newMessageForm").innerHTML = `
    <label for="newMessage" class="privateMessageField" id="${e.detail.targetUser}">@${e.detail.targetUser}: </label>
        <input id="newMessage" type="text" placeholder="EnTer your message">
        <button type="button" id="saveMessageBtn--${sessionStorage.getItem("activeUser")}">Send</button>
    `
})

// lets you press enter to save a message
document.addEventListener("keydown", e => {
    // console.log(e)
    if (e.key === "Enter"){  
        if(document.getElementById("newMessage").value) {
            const activeUserId = parseInt(sessionStorage.getItem("activeUser"))
            // replaces lowercase Ts
            const messageArray = [
                document.getElementById("newMessage")
            ]
            replaceTs(messageArray)

            let newEvent = new CustomEvent("messageSaved", {
                detail: {
                    activeUserId: parseInt(activeUserId),
                    message: document.getElementById("newMessage").value            
                }
            })
            if (document.querySelector(".privateMessageField")){
                let targetUser = document.querySelector(".privateMessageField").id
                newEvent.detail.user = document.querySelector(".privateMessageField").id
                newEvent.detail.message = `@${targetUser}: ${document.getElementById("newMessage").value}`
                eventHub.dispatchEvent(newEvent)
                document.getElementById("newMessage").value = ""
                document.querySelector(".privateMessageField").remove()
            } else {
                eventHub.dispatchEvent(newEvent)
                document.getElementById("newMessage").value = ""
            }
        }
    }
})

