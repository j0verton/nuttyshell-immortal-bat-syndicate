import { Message } from "./Message.js"
import { getMessages, useMessages } from "./MessageProvider.js"

const eventHub = document.querySelector("body")

//this function pulls the messages off the server, loops the function to convert the objects to html and places them on the DOM
export async function MessageList() {
    let messageTarget = document.querySelector("#messages")
    let allMessageHTML = `<ul>`
    let messages = await getMessages()
    const mapMessages = async () => { 

        return Promise.all(messages.map(messageObj => Message(messageObj)))
    }
    mapMessages().then(result => {
        messageTarget.innerHTML = result.join("")
    })
}   

//an event listener to rerender the messages whne one has changed
eventHub.addEventListener("messageStateChanged", e => {
    MessageList()
})

// a click event listener for a delete message button 
document.addEventListener("click", clickEvent => {   
    if(clickEvent.target.classList.contains("deleteMessage")) {
        clickEvent.preventDefault()
        const [prefix, messageId] = clickEvent.target.id.split("--")
        let newEvent = new CustomEvent("messageDeleted", {
            detail: {
                id: messageId,        
            }
        })
        eventHub.dispatchEvent(newEvent)
    }
})

// a click event listener for an edit message button if there's not already an edit open
document.addEventListener("click", clickEvent => {
    if(clickEvent.target.classList.contains("editMessage") && !document.getElementById("editMessageField")) {
        clickEvent.preventDefault()
        const [prefix, messageId] = clickEvent.target.id.split("--")
        let newEvent = new CustomEvent("editMessage", {
            detail: {
                id: messageId,
                messageText: clickEvent.target.parentElement.textContent.split("-")[0],
                targetContainer: clickEvent.target.parentElement.parentElement     
            }
        })
        eventHub.dispatchEvent(newEvent)
    }
})

//this is a long polling function which makes continuous fetch calls to the server so that near real time chatting can occur
export async function chatFeed() {
    if(!document.querySelector("#editMessageForm")){
        await getMessages();
        MessageList()
        await new Promise(resolve => setTimeout(resolve, 1000));
        await chatFeed();
    } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await chatFeed();
    }
}
  