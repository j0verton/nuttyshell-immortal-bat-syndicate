import { Message } from "./Message.js"
import { getMessages, useMessages } from "./MessageProvider.js"

const eventHub = document.querySelector("body")

//this function pulls the messages off the server, loops the function to convert the objects to html and places them on the DOM
export async function MessageList() {
    let messageTarget = document.querySelector("#messages")
    let allMessageHTML = `<ul>`
    getMessages()
        .then(useMessages)
        .then(messageArray => {
           return messageArray.map(messageObj => {
               let messageHTML = await Message(messageObj)
               allMessageHTML += messageHTML
               console.log(allMessageHTML)
            //    .then(responseHTML => {
            //        allMessageHTML += messageHTML
               })
            })
            
        // })
        // .then(responseHTML=>{
        //     messageTarget.innerHTML = responseHTML
        }
        // )

// } 
//an event listener to rerender the messages whne one has changed
eventHub.addEventListener("messageStateChanged", e => {
    MessageList()
})

// a click event for the delete button
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