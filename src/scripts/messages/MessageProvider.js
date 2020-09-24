const eventHub = document.querySelector("body")

let messages = []

export const useMessages = () => {
    return messages.slice()
}

export const saveMessage = message => {
    return fetch('http://localhost:8088/messages', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(note)
})
.then(getMessages)
.then(dispatchStateChangeEvent)
}

export const getMessage = () => {
    return fetch('http://localhost:8088/notes')
        .then(response => response.json())
        .then(parsedMessages => {
            messages = parsedMessages
            console.log(messages)
        })
}

const dispatchStateChangeEvent = () => {
    const StateChangedEvent = new CustomEvent("messageStateChanged")    
    eventHub.dispatchEvent(StateChangedEvent)
}

eventHub.addEventListener("messageSaved", e => {
    let message = {
        sendingUserId: e.detail.activeUserId,
        message: e.detail.message,
        date: Date.now()
    }
    saveMessage(message)
        .then(useMessages)
})