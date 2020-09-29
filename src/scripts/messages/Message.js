import { findUserById } from "./MessageProvider.js"

//a function to  create an html message from a message object
export async function Message (messageObj) {
    let message = {}
    let currentUser = parseInt(sessionStorage.getItem("activeUser"))
    let timeStamp= ''
    let messageDateArray = messageObj.date.split(" ")
    let messageDate = messageDateArray.slice(1,4).join(" ")
    let rightNow = new Date()
    let currentDateArray = rightNow.toString().split(" ")
    let currentDate = currentDateArray.slice(1,4).join(" ")
    if (messageDate === currentDate){
        timeStamp = messageDateArray[4]
    } else {
        timeStamp = messageDateArray.slice(1,5).join(" ")
    }
    //this code determines whether or not the message was sent by the currentUser, whether it is private and sets the classes for css
    //current user sent public messages
    if (messageObj.sendingUserId === currentUser && !messageObj.userId !== currentUser){
        return ` 
        <div class="currentUserMessageContainer">  
            <li class="currentUser message"><strong>${messageObj.message}</strong><br>- <small>${timeStamp}</small>
                <button class="deleteMessage" id="deleteMessage--${messageObj.id}">🗑️</button>
                <button class="editMessage" id="editMessage--${messageObj.id}">✏️</button>
            </li>
        </div>
            `
    //current user sent private messages
    } else if (messageObj.sendingUserId === parseInt(sessionStorage.getItem("activeUser")) && messageObj.userId === currentUser){
        console.log("current private", messageObj)
        return ` 
        <div class="currentUserMessageContainer">  
            <li class="currentUser private message"><strong>${messageObj.message}</strong><br>- <small>${timeStamp}</small>
                <button class="deleteMessage" id="deleteMessage--${messageObj.id}">🗑️</button>
                <button class="editMessage" id="editMessage--${messageObj.id}">✏️</button>
            </li>
        </div>
            `
    //other user sent public messages
    } else if (messageObj.sendingUserId !== parseInt(sessionStorage.getItem("activeUser")) && !messageObj.userId){
        console.log("other public", messageObj)
        let user = await findUserById(messageObj.sendingUserId)
        return ` 
            <div class="friendMessageContainer">  
                <li class="user--${messageObj.sendingUserId} message" ><strong>${messageObj.message}</strong><br>- <a id="msgUser--${messageObj.sendingUserId}" href="">${user[0].username}</a><small> ${timeStamp}</small>
                </li>
            </div>
                `
    // other user private to not current user
    } else if (messageObj.sendingUserId !== parseInt(sessionStorage.getItem("activeUser")) && messageObj.userId !== currentUser){
        return ``                 
    //other user sent private messages
    } else if (messageObj.sendingUserId !== parseInt(sessionStorage.getItem("activeUser")) && messageObj.userId === currentUser){
        console.log("other private", messageObj)
        let user = await findUserById(messageObj.sendingUserId)
        let currentUser = await findUserById(parseInt(sessionStorage.getItem("activeUser")))
        return ` 
            <div class="friendMessageContainer">  
                <li class="user--${messageObj.sendingUserId} private message" ><strong>${messageObj.message}</strong><br>- <a id="msgUser--${messageObj.sendingUserId}" href="">${user[0].username}</a><small> ${timeStamp}</small>
                </li>
            </div>
                `
    }
}


