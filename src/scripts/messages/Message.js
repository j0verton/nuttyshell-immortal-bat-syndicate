import { findUserById } from "./MessageProvider.js"

//a function to  create an html message from a message object
export const Message = messageObj => {
    let timeStamp= ''

    let messageDate = messageObj.date.split("T")[0]
    let currentDate = new Date().toISOString().split("T")[0]
    if (messageDate === currentDate){
        timeStamp = messageObj.date.split("T")[1].split(".")[0]
    } else {
        timeStamp = messageObj.date.split("T").join(' ').split(".")[0]
    }
    //this code determines whether or not the message was sen by the currentUser and setts the class for css
    if (messageObj.sendingUserId === parseInt(sessionStorage.getItem("activeUser"))){
        return ` 
        <div class="currentUserMessageContainer">  
            <li class="currentUser message">${messageObj.message} - <small>${timeStamp}</small><button class="deleteMessage" id="deleteMessage--${messageObj.id}">🗑️</button></li>
        </div>
            `
    } else {
        let user = findSendingUser(messageObj.sendingUserId)
        console.log(user)
        return ` 
            <div class="friendMessageContainer">  
                 <li class="user--${messageObj.sendingUserId} message">${messageObj.message} - ${user[0].username} <small>${timeStamp}</small></li>
            </div>
        `
    }
}

async function findSendingUser(userId) {
    const userObj = await findUserById(userId)
    return userObj
}
