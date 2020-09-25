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
    body: JSON.stringify(message)
})
.then(getMessages)
.then(dispatchStateChangeEvent)
}

export const getMessages = () => {
    return fetch('http://localhost:8088/messages')
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
    let messageDate =new Date()
    
    // .toLocaleString(undefined, {
    //     day: 'numeric',
    //     month: 'numeric',
    //     year: 'numeric',
    //     hour: '2-digit',
    //     minute: '2-digit',
    // })
console.log(messageDate)
    let message = {
        sendingUserId: e.detail.activeUserId,
        message: e.detail.message,
        date: messageDate
    }
    saveMessage(message)
        .then(useMessages)
})