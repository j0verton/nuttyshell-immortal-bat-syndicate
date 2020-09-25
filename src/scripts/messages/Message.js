export const Message = messageObj => {
    let timeStamp= ''

    let messageDate = messageObj.date.split("T")[0]
    let currentDate = new Date().toISOString().split("T")[0]
    if (messageDate === currentDate){
        timeStamp = messageObj.date.split("T")[1].split(".")[0]
    } else {
        timeStamp = messageObj.date.split("T").join(' ').split(".")[0]
    }


    if (messageObj.userId === sessionStorage.getItem("activeUser")){
        return ` 
        <div class="currentUserMessageContainer">  
            <li class="currentUser message">${messageObj.message} - <small>${timeStamp}</small><button class="delete">🗑️</button></li>
        </div>
            `

    } else {
        return ` 
        <div class="friendMessageContainer">  
            <li class="user--${messageObj.userId} message">${messageObj.message} - ${messageObj.user.username} <small>${timeStamp}</small></li>
        </div>
            `
    }
}