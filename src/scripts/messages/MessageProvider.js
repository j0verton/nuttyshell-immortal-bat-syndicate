import { getFriends } from "../friends/FriendsData.js"
import { replaceTs } from "../replaceTs.js"

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
            return messages
        })
}
//this function finds a user in the database by their Id
export const findUserById = idNum => {
    return fetch(`http://localhost:8088/users?id=${idNum}`)
        .then(response => response.json())
}
//this function finds a user in the database by their name
export const findUserByName = username => {
    return fetch(`http://localhost:8088/users?username=${username}`)
        .then(response => response.json())
}
//this function gets a specific message by id
export const findMessageById = idNum => {
    return fetch(`http://localhost:8088/messages?id=${idNum}`)
        .then(response => response.json())
}
// deletes message an calls the state change event
export const deleteMessage = (messageId) => {
    return fetch(`http://localhost:8088/messages/${messageId}`, {
      method: "DELETE"
    })
      .then(dispatchStateChangeEvent);
}

//this function puts a new message obj to the database
export const editMessage= messageObj => {
    return fetch(`http://localhost:8088/messages/${messageObj.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(messageObj)
})
.then(dispatchStateChangeEvent)
}

// a state change event to reload the message field 
const dispatchStateChangeEvent = () => {
    const StateChangedEvent = new CustomEvent("messageStateChanged")    
    eventHub.dispatchEvent(StateChangedEvent)
}

//listens for a saved message and turns it into an object then calls the saveMessage function
eventHub.addEventListener("messageSaved", e => {
    let targetUser
        let messageDate =new Date()
        let message = {
            sendingUserId: e.detail.activeUserId,
            message: e.detail.message,
            date: messageDate.toString()
        }
        if (e.detail.user){
            findUserByName(e.detail.user)
            .then(user=> {
                message.userId = user[0].id
                return message
            })
            .then(saveMessage)
            .then(useMessages)
        } else {
        saveMessage(message)
            .then(useMessages)
        }

})

// listens for a delete message and calls the delete function
eventHub.addEventListener("messageDeleted", e => {
    deleteMessage(e.detail.id)
})

// listens for an edit message click and adds an input form 
eventHub.addEventListener("editMessage", e => {
    e.detail.targetContainer.innerHTML= `
        <div id="editMessageForm">
                <input id="editMessageField" type="text" value=${e.detail.messageText}>
                <button type="button" id="editSaveMessageBtn--${e.detail.id}">Save</button>
        </div>
    `
})

// this is a click event to save a message that is being edited
eventHub.addEventListener("click", clickEvent =>{
    if (clickEvent.target.id.includes("editSaveMessageBtn")){
        clickEvent.preventDefault()
        const [prefix, messageId] = clickEvent.target.id.split("--")  
        findMessageById(messageId)
            .then(messageObj => {
                messageObj[0].message = document.getElementById("editMessageField").value 
                return messageObj[0]
            })
            .then(editMessage)
            .then(dispatchStateChangeEvent)
    }
})
