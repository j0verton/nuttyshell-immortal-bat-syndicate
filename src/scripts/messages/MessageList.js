import { Message } from "./Message.js"
import { getMessages, useMessages } from "./MessageProvider.js"

const eventHub = document.querySelector("body")

//this function pulls the messages off the server, loops the function to convert the objects to html and places them on the DOM
// export const MessageList = () => {
//     let messageTarget = document.querySelector("#messages")
//     let allMessageHTML = `<ul>`
//     getMessages()
//         .then(useMessages)
//         .then(messageArray => {
//             messageArray.map(messageObj => {
//                 let messageHTML = Message(messageObj)
//                 allMessageHTML += messageHTML
//             })
//             messageTarget.innerHTML = allMessageHTML
//         })
// } 

export async function MessageList() {
    let messageTarget = document.querySelector("#messages")
    let allMessageHTML = `<ul>`
    let messages = await getMessages()
    const mapMessages = async () => { 
        // let messagesArray = await messages.map(messageObj => Message(messageObj))
        // console.log(messagesArray)
        // return messagesArray
        return Promise.all(messages.map(messageObj => Message(messageObj)))
    }
    mapMessages().then(result => {
        console.log(result)
        messageTarget.innerHTML = result.join("")
    })
}   

//an event listener to rerender the messages whne one has changed
eventHub.addEventListener("messageStateChanged", e => {
    MessageList()
})

// a click event listener for a delete message button 
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