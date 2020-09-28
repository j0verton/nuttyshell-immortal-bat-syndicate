import { findUserById } from "./MessageProvider.js"

//a function to  create an html message from a message object
export async function Message (messageObj) {
    let timeStamp= ''

    let messageDateArray = messageObj.date.split(" ")
    let messageDate = messageDateArray.slice(1,4).join(" ")
    console.log(messageDateArray)
    let aDate = new Date()
    let newDateArray = aDate.split(" ")
    console.log(newDateArray)
    // let currentDate = newDate.slice(1,4).join(" ")
    // let messageDate = messageObj.date.split("T")[0]
    // let currentDate = new Date().toISOString().split("T")[0]
    if (messageDate === currentDate){
        timeStamp = messageDateArray[4]
    } else {
        timeStamp = messageDateArray.slice(1,5).join(" ")
    }
    //this code determines whether or not the message was sen by the currentUser and setts the class for css
    if (messageObj.sendingUserId === parseInt(sessionStorage.getItem("activeUser"))){
        return ` 
        <div class="currentUserMessageContainer">  
            <li class="currentUser message">${messageObj.message} - <small>${timeStamp}</small><button class="deleteMessage" id="deleteMessage--${messageObj.id}">🗑️</button></li>
        </div>
            `

    } else {
        let user = await findUserById(messageObj.sendingUserId)
        return ` 
            <div class="friendMessageContainer">  
                <li class="user--${messageObj.sendingUserId} message">${messageObj.message} - ${user[0].username} <small>${timeStamp}</small></li>
            </div>
                `
    }
}


