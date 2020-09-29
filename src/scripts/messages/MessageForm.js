const eventHub = document.querySelector("body")

//creates the message form and display fied
export const NewMessageForm = () => { 
    let activeUser = sessionStorage.getItem("activeUser")
    document.querySelector("aside").innerHTML += 
    `   <section id="messageContainer">
            <div id="messages"></div>
            <div id="newMessageForm">
                <input id="newMessage" type="text" placeholder="Enter your message">
                <button type="button" id="saveMessageBtn--${activeUser}">Send</button>
            </div>
        </section>
    `
}

// creates a custom event for a save message button click
document.addEventListener("click", clickEvent => {
    
    if(clickEvent.target.id.startsWith("saveMessageBtn") && document.getElementById("newMessage").value) {
        clickEvent.preventDefault()
        const [prefix, activeUserId] = clickEvent.target.id.split("--")
        let newEvent = new CustomEvent("messageSaved", {
            detail: {
                activeUserId: parseInt(activeUserId),
                message: document.getElementById("newMessage").value            
            }
        })
        eventHub.dispatchEvent(newEvent)
        document.getElementById("newMessage").value = ""
    }
})
//
// document.addEventListener("keyup", e => {
//     if (e.key === 13){  
//         debugger 
//         if(document.getElementById("newMessage").value) {
//             const activeUserId = parseInt(sessionStorage.getItem("activeUser"))
//             console.log(activeUserId)
//             let newEvent = new CustomEvent("messageSaved", {
//                 detail: {
//                     activeUserId: parseInt(activeUserId),
//                     message: document.getElementById("newMessage").value            
//                 }
//             })
//             eventHub.dispatchEvent(newEvent)
//             document.getElementById("newMessage").value = ""
//         }
// }
// })

