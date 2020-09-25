import { Message } from "./Message.js"
import { getMessages, useMessages } from "./MessageProvider.js"

export const MessageList = () => {
    let messageTarget = document.querySelector("#messages")
    let allMessageHTML = `<ul>`
    getMessages()
        .then(useMessages)
        .then(messageArray => {
            messageArray.reverse().map(messageObj => {
                let messageHTML = Message(messageObj)
                allMessageHTML += messageHTML
                console.log(messageObj)
                console.log(allMessageHTML)
            })
            messageTarget.innerHTML = allMessageHTML
        })

} 