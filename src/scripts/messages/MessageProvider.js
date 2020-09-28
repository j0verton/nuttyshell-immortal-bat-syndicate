const eventHub = document.querySelector("body")

let messages = []

//the function creates a copy of the messages that other modules can use
export const useMessages = () => {
    return messages.slice()
}

//this function saves new messages and dispatches a state change event to update the list 
export const saveMessage = message => {
    return fetch('http://localhost:8088/messages', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
})
.then(dispatchStateChangeEvent)
}
//pulls the messages from the server
export const getMessages = () => {
    return fetch('http://localhost:8088/messages')
        .then(response => response.json())
        .then(parsedMessages => {
            messages = parsedMessages
        })
}

export const findUserById = idNum => {
    return fetch(`http://localhost:8088/users?id=${idNum}`)
        .then(response => response.json())
}
// deletes message an calls the state change event
export const deleteMessage = (messageId) => {
    return fetch(`http://localhost:8088/messages/${messageId}`, {
      method: "DELETE"
    })
      .then(dispatchStateChangeEvent);
}

// a state change event to reload the message field 
const dispatchStateChangeEvent = () => {
    const StateChangedEvent = new CustomEvent("messageStateChanged")    
    eventHub.dispatchEvent(StateChangedEvent)
}

//listens for a saved message and turns it into an object then calls the saveMessage function
eventHub.addEventListener("messageSaved", e => {
    let messageDate =new Date().toISOString()
    let message = {
        sendingUserId: e.detail.activeUserId,
        message: e.detail.message,
        date: messageDate
    }
    saveMessage(message)
        .then(useMessages)
})

// listens for a delete message and calls the delete function
eventHub.addEventListener("messageDeleted", e => {
    deleteMessage(e.detail.id)
})

