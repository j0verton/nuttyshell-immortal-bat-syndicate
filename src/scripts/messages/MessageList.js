import { Message } from "./Message.js"
import { getMessages, useMessages } from "./MessageProvider.js"

const eventHub = document.querySelector("body")


export const MessageList = () => {
    let messageTarget = document.querySelector("#messages")
    let allMessageHTML = `<ul>`
    getMessages()
        .then(useMessages)
        .then(messageArray => {
            messageArray.map(messageObj => {
                let messageHTML = Message(messageObj)
                allMessageHTML += messageHTML
                console.log(messageObj)
                console.log(allMessageHTML)
            })
            messageTarget.innerHTML = allMessageHTML
        })

} 

eventHub.addEventListener("messageStateChanged", e => {
    MessageList()
})

document.addEventListener("click", clickEvent => {
    clickEvent.preventDefault()
    if(clickEvent.target.classList.contains("deleteMessage")) {
        const [prefix, messageId] = clickEvent.target.id.split("--")
        let newEvent = new CustomEvent("messageDeleted", {
            detail: {
                id: messageId,        
            }
        })
        eventHub.dispatchEvent(newEvent)
    }
})